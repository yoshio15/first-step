declare module "*.png" {
  const value: any;
  export default value;
}

declare module 'graphql/language/ast' {
  export type DocumentNode = any
}