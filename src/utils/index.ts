function postedAt(date: string) {
  const now = new Date().getTime();
  const posted = new Date(date).getTime();
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} days ago`;
  }
  if (diffHours > 0) {
    return `${diffHours} hours ago`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} minutes ago`;
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} seconds ago`;
  }
  return 'just now';
}

function commentsCount(totalComment: number): string {
  if (totalComment > 1) return `${totalComment} comments`;
  if (totalComment === 1) return `${totalComment} comment`;
  return 'No comment';
}

function threadsCount(totalThread: number): string {
  if (totalThread > 1) return `${totalThread} threads posted`;
  if (totalThread === 1) return `${totalThread} thread posted`;
  return 'No thread posted yet';
}

interface MenuLink {
  href: string;
  content: string;
  visible: 'all' | 'no-auth' | 'auth';
}

const menuLinkItems: MenuLink[] = [
  {
    href: '/leaderboard',
    content: 'Leaderboard',
    visible: 'all',
  },
  {
    href: '/login',
    content: 'Log in',
    visible: 'no-auth',
  },
  {
    href: '/register',
    content: 'Register',
    visible: 'no-auth',
  },
  {
    href: '/create-thread',
    content: 'New thread',
    visible: 'auth',
  },
  {
    href: '/profile',
    content: 'My profile',
    visible: 'auth',
  },
];

export { postedAt, commentsCount, threadsCount, menuLinkItems };
