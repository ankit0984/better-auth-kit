"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/server/user";
import { toast } from "sonner";

export function RegisterForm({ className, ...props }) {
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		username: "",
		email: "",
		password: "",
		cnfpassword: "",
	});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async () => {
		if (formData.password !== formData.cnfpassword) {
			toast.error("Passwords do not match");
			return;
		}
		

		try {
			await signUp({
				firstname: formData.firstname,
				lastname: formData.lastname,
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});
			// Optionally, you can redirect the user or perform any other action after successful registration
			// For example, redirect to a login page or show a success message
			toast.success("Registration successful!");
			window.location.href = "/login";
		} catch (err) {
			console.error(err);
			toast.error("Registration failed. Please try again.");
		}
	};

	return (
		<form className={cn("flex flex-col gap-6", className)} {...props}>
			<div className='flex flex-col items-center gap-2 text-center'>
				<h1 className='text-2xl font-bold'>Register to your account</h1>
				<p className='text-muted-foreground text-sm text-balance'>
					Enter your email below to login to your account
				</p>
			</div>
			<div className='grid grid-cols-2 gap-6'>
				<div className='grid gap-3'>
					<Label htmlFor='email'>Email</Label>
					<Input
						id='email'
						type='email'
						placeholder='m@example.com'
						required
						onChange={handleChange}
					/>
				</div>
				<div className='grid gap-3'>
					<Label htmlFor='username'>Username</Label>
					<Input
						id='username'
						type='text'
						placeholder='user@123'
						required
						onChange={handleChange}
					/>
				</div>
				<div className='grid gap-3'>
					<Label htmlFor='firstname'>firstname</Label>
					<Input
						id='firstname'
						type='text'
						placeholder='praju'
						required
						onChange={handleChange}
					/>
				</div>
				<div className='grid gap-3'>
					<Label htmlFor='lastname'>lastname</Label>
					<Input
						id='lastname'
						type='text'
						placeholder='sen'
						required
						onChange={handleChange}
					/>
				</div>
				<div className='grid gap-3'>
					<Label htmlFor='password'>Password</Label>
					<Input
						id='password'
						type='password'
						required
						onChange={handleChange}
					/>
				</div>
				<div className='grid gap-3'>
					<Label htmlFor='cnfpassword'>Confirm Password</Label>
					<Input
						id='cnfpassword'
						type='password'
						required
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className='grid gap-6'>
				<Button type='button' className='w-full' onClick={handleSubmit}>
					Sign up
				</Button>
			</div>
		</form>
	);
}
