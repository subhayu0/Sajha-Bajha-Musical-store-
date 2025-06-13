import "../assets/css/Register.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Register() {
  const apiCall = useMutation({
    mutationKey: ["POST_USER_REGISTER"],
    mutationFn: async (formData) => {
      try {
        const response = await axios.post("http://localhost:8082/user/save", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        throw new Error(error?.response?.data?.message || error.message);
      }
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await apiCall.mutateAsync(data);
      toast.success("Registration successful!");
      console.log("Registration successful");
      // Optional: navigate("/login");
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  return (
    <div className="register-container">
      <div className="r-Signup-form">
        <div className="r-Head">
          <img src="images/logo.png" alt="logo" />
          <h1>Signup</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="r-Body">
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && <p className="error-msg">First name is required.</p>}

            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && <p className="error-msg">Last name is required.</p>}

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="error-msg">Email is required.</p>}

            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && <p className="error-msg">Password is required.</p>}

            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
              <p className="error-msg">Please confirm your password.</p>
            )}
          </div>

          <div className="r-Footer">
            <div className="r-checkbox">
              <label>
                <input type="checkbox" required /> I accept the terms and privacy policy.
              </label>
            </div>

            <div className="r-button">
              <Link to="/login" className="btn-secondary">Sign In</Link>
              <button type="submit" disabled={apiCall.isLoading}>
                {apiCall.isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Register;
