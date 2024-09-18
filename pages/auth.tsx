import { useCallback, useState } from "react";
import Input from "@/components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

const Auth = () => {
  // tạo user
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // tạo giá trị ban đầu là login/đăng nhập
  const [variant, setVariant] = useState("login");

  // trạng thái để hiển thị thông báo
  const [message, setMessage] = useState("");

  // chuyển đổi trạng thái giữa login/register
  const toggeleVariant = useCallback(() => {
    setVariant(
      (currentVariant) => (currentVariant === "login" ? "register" : "login") // Sửa thành "login" và "register"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Prevents automatic redirection after login
      });
  
      if (result?.ok) {
        // If login is successful, store the email in localStorage
        localStorage.setItem("userEmail", email);
        window.location.href = "/profiles"; // Redirect manually
      } else {
        // Handle login failure
        setMessage("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (error) {
      console.log(error);
      setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  }, [email, password]);
  

  const register = useCallback(async () => {
    try {
      const response = await axios.post("/api/register", {
        email,
        name,
        password,
      });

      if (response.status === 200) {
        // Đăng ký thành công, hiển thị thông báo
        setMessage("Đăng ký thành công! Hãy đăng nhập.");
      }

      login();
    } catch (error) {
      // Hiển thị lỗi nếu xảy ra lỗi
      console.log(error);
      setMessage("Đăng ký thất bại. Vui lòng thử lại.");
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')]">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logopng.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center ">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-1/2 lg:max-w-md rounded-md w-full">
            <h2 className="text-gray-50 text-4xl mb-8 font-semibold">
              {variant === "login" ? "Đăng nhập" : "Đăng kí"}{" "}
              {/* Sửa thành "login" */}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" /* Sửa thành "register" */ && (
                <Input
                  label="Tên người dùng"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  type="name"
                  value={name}
                />
              )}

              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Mật khẩu"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register} // Thêm sự kiện onClick
              className="bg-red-500 py-3 text-white rounded-md w-full my-5"
            >
              {variant === "login" ? "Login" : "Đăng kí"}
            </button>

            {/* Thêm phần hiển thị thông báo */}
            {message && <p className="text-white mt-2">{message}</p>}

              {/* Phần đăng nhập bằng gg và github*/}
            <div className="flex flex-row items-center gap-4 mt-2 justify-center">
              <div
                onClick={() => signIn('google', {callbackUrl: '/profiles'})}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={30} />
              </div>

              <div 
                  onClick={() => signIn('github', {callbackUrl: '/'})}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={30} />
              </div>
            </div>

            <p className="text-neutral-500 mt-2">
              {variant === "login"
                ? "Bạn chưa có tài khoản"
                : "Đã có tài khoản ?"}
              <span
                onClick={toggeleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Đăng kí tài khoản" : "Đăng nhập"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
