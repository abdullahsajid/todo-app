import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

namespace UserUtils {
  const encodedSecret = new TextEncoder().encode(process.env.SECRET_KEY);

  export const createJWT = async (
    uid: string,
    expiresIn: number = 60 * 60 * 2
  ) => {
    const token = await new SignJWT({ id: uid })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(getTwoHoursLaterTime())
      .sign(encodedSecret);

    return token;
  };

  export const verifyAuthorization = async (req: NextRequest) => {
    try {
      const projectName = process.env.PROJECT_NAME!;
      const token = req.cookies.get(`${projectName}-token`)?.value;

      if (!token) throw new Error();

      const { payload } = await jwtVerify(token, encodedSecret);

      if (!payload) throw "Unauthorized";
    } catch (error) {
      return Response.json(
        { success: false, message: "You are not authorized for this action" },
        { status: 401 }
      );
    }
  };

  function getTwoHoursLaterTime() {
    const date = new Date();
    date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
    return date;
  }
}

export default UserUtils;
