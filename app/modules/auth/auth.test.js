const { AuthService } = require('./auth.service');
const { AuthController } = require('./auth.controller');
const createHttpError = require('http-errors');
const { userModel } = require('../../models/user.model');
const { hashPassword } = require('../../common/password/bcrypt.password');
const { createJwt } = require('../../common/jwt/jwt');

// Mock dependencies
jest.mock('../../models/user.model');
jest.mock('../../common/password/bcrypt.password');
jest.mock('../../common/jwt/jwt');

describe('Auth Service Tests', () => {
    let authService;

    beforeEach(() => {
        authService = AuthService;
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        const mockUserDto = {
            email: 'test@example.com',
            password: 'password123',
            first_name: 'John',
            last_name: 'Doe'
        };

        it('should register a new user successfully', async () => {
            // Mock userModel.findOne to return null (user doesn't exist)
            userModel.findOne.mockResolvedValue(null);
            
            // Mock hashPassword
            hashPassword.mockReturnValue('hashedPassword');
            
            // Mock userModel.create
            const mockCreatedUser = { ...mockUserDto, _id: '123', password: 'hashedPassword' };
            userModel.create.mockResolvedValue(mockCreatedUser);

            const result = await authService.registerUser(mockUserDto);

            expect(userModel.findOne).toHaveBeenCalledWith({ email: mockUserDto.email });
            expect(hashPassword).toHaveBeenCalledWith(mockUserDto.password);
            expect(userModel.create).toHaveBeenCalled();
            expect(result).toEqual(mockCreatedUser);
        });

        it('should throw error if user already exists', async () => {
            // Mock userModel.findOne to return existing user
            userModel.findOne.mockResolvedValue({ email: mockUserDto.email });

            await expect(authService.registerUser(mockUserDto))
                .rejects
                .toThrow(createHttpError[401]('This user already exists'));
        });
    });

    describe('loginUser', () => {
        const mockUserDto = {
            email: 'test@example.com',
            password: 'password123'
        };

        const mockUser = {
            _id: '123',
            email: 'test@example.com',
            password: 'hashedPassword'
        };

        it('should login user successfully', async () => {
            // Mock userModel.findOne to return user
            userModel.findOne.mockResolvedValue(mockUser);
            
            // Mock verifyPassword (you'll need to implement this)
            // const verifyPassword = jest.fn().mockResolvedValue(true);
            
            // Mock createJwt
            createJwt.mockReturnValue('mockToken');

            const result = await authService.loginUser(mockUserDto);

            expect(userModel.findOne).toHaveBeenCalledWith({ email: mockUserDto.email });
            expect(createJwt).toHaveBeenCalledTimes(2);
            expect(result).toHaveProperty('accessToken');
            expect(result).toHaveProperty('refreshToken');
        });

        it('should throw error if user not found', async () => {
            // Mock userModel.findOne to return null
            userModel.findOne.mockResolvedValue(null);

            await expect(authService.loginUser(mockUserDto))
                .rejects
                .toThrow(createHttpError[401]('Not Found Any User'));
        });
    });

    describe('getUserInformation', () => {
        const mockUserId = '123';
        const mockUser = {
            _id: mockUserId,
            email: 'test@example.com',
            first_name: 'John',
            last_name: 'Doe'
        };

        it('should return user information successfully', async () => {
            // Mock userModel.findById
            userModel.findById.mockReturnValue({
                select: jest.fn().mockResolvedValue(mockUser)
            });

            const result = await authService.getUserInformation(mockUserId);

            expect(userModel.findById).toHaveBeenCalledWith(mockUserId);
            expect(result).toEqual(mockUser);
        });
    });
});

describe('Auth Controller Tests', () => {
    let authController;
    let mockReq;
    let mockRes;
    let mockNext;

    beforeEach(() => {
        authController = AuthController;
        mockReq = {
            body: {},
            user: {}
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        mockNext = jest.fn();
    });

    describe('registerUser', () => {
        it('should register user successfully', async () => {
            const mockUserData = {
                email: 'test@example.com',
                password: 'password123',
                first_name: 'John',
                last_name: 'Doe'
            };
            mockReq.body = mockUserData;

            // Mock AuthService.registerUser
            jest.spyOn(AuthService, 'registerUser').mockResolvedValue({
                ...mockUserData,
                _id: '123'
            });

            await authController.registerUser(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'User created successfully',
                data: expect.any(Object)
            });
        });
    });

    describe('loginUser', () => {
        it('should login user successfully', async () => {
            const mockLoginData = {
                email: 'test@example.com',
                password: 'password123'
            };
            mockReq.body = mockLoginData;

            // Mock AuthService.loginUser
            jest.spyOn(AuthService, 'loginUser').mockResolvedValue({
                accessToken: 'mockAccessToken',
                refreshToken: 'mockRefreshToken'
            });

            await authController.loginUser(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'User logged in successfully',
                data: expect.any(Object)
            });
        });
    });

    describe('getUserInformation', () => {
        it('should get user information successfully', async () => {
            const mockUser = {
                _id: '123',
                email: 'test@example.com',
                first_name: 'John',
                last_name: 'Doe'
            };
            mockReq.user = { id: '123' };

            // Mock AuthService.getUserInformation
            jest.spyOn(AuthService, 'getUserInformation').mockResolvedValue(mockUser);

            await authController.getUserInformation(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: 'User information fetched successfully',
                data: mockUser
            });
        });
    });
}); 