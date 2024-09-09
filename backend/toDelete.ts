interface RequestWithUser extends Request {
    user: {
      _id: string;
      name: string;
      email: string;
    };
  }



  const getUserProfile = asyncHandler(async(req: RequestWithUser, res: Response) => {
    const user = {
      _id: req.user?._id,
      name: req.user?.name,
      email: req.user?.email,
    }
    res.status(200).json(user);
  })
  
  const updateUserProfile = asyncHandler(async(req: RequestWithUser, res: Response) => {
    // ...
  })