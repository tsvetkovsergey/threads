'use server';

import { connectToDB } from '../mongoose';
import User from '../models/user.model';
import { revalidatePath } from 'next/cache';
import Thread from '../models/thread.model';
import { FilterQuery, SortOrder } from 'mongoose';
import Community from '../models/community.model';

interface updateUserParams {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: updateUserParams): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === '/profile/edit') {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId }).populate({
      path: 'communities',
      model: Community,
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user data: ${error.message}`);
  }
}

export async function fetchUserThreads(userId: string) {
  try {
    connectToDB();

    // Find all threads of the user
    // TODO: Populate Community
    const threads = await User.findOne({ id: userId }).populate({
      path: 'threads',
      model: Thread,
      populate: [
        {
          path: 'community',
          model: Community,
          select: '_id id name image',
        },
        {
          path: 'children',
          model: Thread,
          populate: {
            path: 'author',
            model: User,
            select: 'id name image',
          },
        },
      ],
    });

    return threads;
  } catch (error: any) {
    throw new Error(`Failed to fetch user threads: ${error.message}`);
  }
}

export async function fetchAllUsers({
  userId,
  searchString = '',
  pageNumber = 1,
  pageSize = 20,
  sortBy = 'desc',
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, 'i');

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== '') {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const userQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);

    const users = await userQuery.exec();

    const isNotLastPage = totalUsersCount > skipAmount + users.length;

    return { users, isNotLastPage };
  } catch (error: any) {
    throw new Error(`Failed to fetch all users: ${error.message}`);
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDB();

    // Find all threads created by user
    const userThreads = await Thread.find({ author: userId });

    // Collect all the child thread ids (replies) from the 'children' field
    const childThreadIds = userThreads.reduce((acc, { children }) => {
      acc.push(...children);
      return acc;
    }, []);

    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId },
    }).populate({
      path: 'author',
      model: User,
      select: '_id name image',
    });

    return replies;
  } catch (error: any) {
    throw new Error(`Failed to fetch activity: ${error.message}`);
  }
}

export async function fetchRandomUsers(size = 3) {
  try {
    connectToDB();

    const randomUsers = await User.aggregate().sample(size);

    return randomUsers;
  } catch (error: any) {
    console.error('Failed to fetch random communities: ', error);
  }
}
