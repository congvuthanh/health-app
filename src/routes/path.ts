export const routePath = {
  TopPage: '/',
  MyPage: '/myPage',
  AuthFailedPage: '/authenticationError',
} as const;

type ValueOf<T> = T[keyof T];
type P = ValueOf<typeof routePath>;

export type AppPath = P extends infer T
  ? T extends (...subPath: string[]) => infer U
    ? U
    : T
  : never;
