interface Owner {
  id: string;
  name: string;
  avatar: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  owner: Owner;
  upVotesBy: string[];
  downVotesBy: string[];
}

export interface Thread {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  category: string;
  owner: Owner;
  comments: Comment[];
  upVotesBy: string[];
  downVotesBy: string[];
}

export interface User extends Owner {
  email: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}
