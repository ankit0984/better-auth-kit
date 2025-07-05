import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/connection"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { authSchema } from "@/schema/auth-schema.js";
import { render } from "@react-email/render";
import { haveIBeenPwned } from "better-auth/plugins";
import { sendEmail } from "@/utils/email";
import PasswordReset from "@/email/ResetPassword";
import VerificationEmail from "@/email/VerifyEmail";

export const auth = betterAuth({
	rateLimit: {
		window: 10,
		max: 100,
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
	},
	trustedOrigins: [process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"],
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: authSchema,
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }) => {
			const ResetPasswordEmail = await render(
				<PasswordReset username={user.username} resetUrl={url} />
			);
			await sendEmail({
				to: user.email,
				subject: "Reset your password",
				html: ResetPasswordEmail,
			});
		},
	},
	socialProviders: {
		google: {
			prompt: "select_account",
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			mapProfileToUser: (profile) => {
				return {
					firstname: profile.given_name,
					lastname: profile.family_name,
				};
			},
		},
	},
	user: {
		additionalFields: {
			firstname: {
				type: "string",
				required: true,
			},
			lastname: {
				type: "string",
				required: true,
			},
			username: {
				type: "string",
				required: true,
			},
		},
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			const VerifyEmail = await render(
				<VerificationEmail username={user.username} verificationUrl={url} />
			);
			await sendEmail({
				subject: "Verify your email",
				to: user.email,
				html: VerifyEmail,
			});
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 3600, // 1 hour
	},
	advanced: {
		useSecureCookies: false,
	},
	plugins: [nextCookies(), haveIBeenPwned()],
});