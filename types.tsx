export type RootStackParamList = {
  Root: undefined;
  NewTweet: undefined;
  NewComment: undefined;
  CommentsView: undefined;
  ProfileView: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Notifications: undefined;
  Messages: undefined;
};

export type HomeNavigatorParamList = {
  HomeScreen: undefined;
};

export type SearchNavigatorParamList = {
  SearchScreen: undefined;
};

export type NotificationsNavigatorParamList = {
  NotificationsScreen: undefined;
};

export type MessagesNavigatorParamList = {
  MessagesScreen: undefined;
};

export type UserType = {
  id: string,
  name: string,
  username: string,
  image?: string,
}

export type TweetType = {
  id: string,
  createdAt: string,
  user: UserType,
  content: string,
  image?: string,
  commentCount?: number,
  retweetCount?: number,
  likeCount?: number,
}

export type CommentType = {
  id: string,
  createdAt: string,
  user: UserType,
  tweet: TweetType,
  content: string,
  image?: string,
  commentCount?: number,
  retweetCount?: number,
  likeCount?: number,
}
