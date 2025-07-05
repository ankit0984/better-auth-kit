// "use client";
// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { authClient, signInwithGoogle } from "@/lib/auth-client";
// import { toast } from "sonner";
// import { signIn } from "@/server/user";
// import { useRouter } from "next/navigation";

// export function ForgetPassEmailForm({ className, ...props }) {
// 	const router = useRouter();
// 	const [formData, setFormData] = useState({
// 		email: "",
// 		password: "",
// 	});
// 	const handleChange = (e) => {
// 		const { id, value } = e.target;
// 		setFormData((prev) => ({ ...prev, [id]: value }));
// 	};
// 	const handleSubmit = async () => {
// 		try {
// 			const { success, message, errorCode } = await authClient.forgetPassword({
// 				email: formData.email,
// 			});

// 			if (success) {
// 				toast.success(message,"Password reset email sent");
				
// 			} else {
// 				// Show specific error message for unverified email
				
// 					toast.error(
// 						message || "Login failed. Please check your credentials."
// 					);
				
// 			}
// 		} catch (err) {
// 			console.error("Login error:", err);
// 			toast.error("An unexpected error occurred. Please try again.");
// 		}
// 	};

// 	return (
// 		<form className={cn("flex flex-col gap-6", className)} {...props}>
// 			<div className='flex flex-col items-center gap-2 text-center'>
// 				<h1 className='text-2xl font-bold'>Forget Password</h1>
// 				<p className='text-muted-foreground text-sm text-balance'>
// 					Enter your email below to change to your account
// 				</p>
// 			</div>
// 			<div className='grid gap-6'>
// 				<div className='grid gap-3'>
// 					<Label htmlFor='email'>Email</Label>
// 					<Input
// 						id='email'
// 						type='email'
// 						placeholder='m@example.com'
// 						required
// 						onChange={handleChange}
// 					/>
// 				</div>
// 				<Button type='button' className='w-full' onClick={handleSubmit}>
// 					Login
// 				</Button>
// 			</div>
// 		</form>
// 	);
// }
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ForgetPassEmailForm({ className, ...props }) {
	const router = useRouter();
	const [formData, setFormData] = useState({ email: "" });
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
			toast.error("Please enter a valid email address.");
			return;
		}

		setLoading(true);
		try {
			// const { success, message } = await authClient.forgetPassword({
			// 	email: formData.email,
			// });
            const {error} = await authClient.forgetPassword({
                email: formData.email,
                redirectTo: `${window.location.origin}/reset-password`,
            });

			if (error) {
				toast.error(error.message );
			} else {
				toast.success("Password reset email sent. Please check your inbox.");
			}
		} catch (err) {
			console.error("Forget password error:", err);
			toast.error("An unexpected error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={cn("flex flex-col gap-6", className)}
			{...props}
		>
			<div className='flex flex-col items-center gap-2 text-center'>
				<h1 className='text-2xl font-bold'>Forgot Password</h1>
				<p className='text-muted-foreground text-sm text-balance'>
					Enter your email below to receive a password reset link.
				</p>
			</div>

			<div className='grid gap-6'>
				<div className='grid gap-3'>
					<Label htmlFor='email'>Email</Label>
					<Input
						id='email'
						type='email'
						placeholder='you@example.com'
						required
						value={formData.email}
						onChange={handleChange}
						disabled={loading}
					/>
				</div>

				<Button type='submit' className='w-full' disabled={loading}>
					{loading ? "Sending..." : "Send Reset Link"}
				</Button>
			</div>
		</form>
	);
}
