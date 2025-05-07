import APIService from "./core/api-service";

namespace SignatureService {
  export const generateWeb3Sign = async (hash: string) => {
    return APIService.post("/signature", { hash });
  };
}

export default SignatureService;
