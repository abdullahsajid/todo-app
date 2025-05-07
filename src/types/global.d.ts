export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BACKEND_BASE_URL: string;
      MONGOOSE_URL: string;
      MORALIS_APP_ID: string;
      MORALIS_SERVER_URL: string;
      CONTRACT_ADDRESS: string;
      NEXT_PUBLIC_SECRET_KEY: string;
      NEXT_PUBLIC_PROJECT_ID: string;
      MONGO_DATA_SOURCE: string;
      MONGO_DATABASE: string;
      MONGO_API_KEY: string;
      PROJECT_NAME: string;
      MONGO_DATA_API_BASE_URL: string;
      NEXT_PUBLIC_DEFAULT_CHAIN_ID: number;
      NEXT_PUBLIC_INFURA_KEY: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
