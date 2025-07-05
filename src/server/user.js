"use server"
import { auth } from "@/lib/auth"

export const signIn = async({email, password}) => {
    try {
        const response = await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        });

        if (response?.error) {
            // Handle specific error for unverified email
            if (response.error.code === 'EMAIL_NOT_VERIFIED') {
                return {
                    success: false,
                    message: 'Please verify your email before logging in.',
                    errorCode: 'EMAIL_NOT_VERIFIED'
                };
            }
            return {
                success: false,
                message: response.error.message || 'Authentication failed.'
            };
        }

        return {
            success: true,
            message: 'Signed in successfully.'
        };
    } catch (error) {
        console.error('Sign in error:', error);
        return {
            success: false,
            message: error.message || 'An error occurred during sign in.'
        };
    }
}
// 			email,
// 			password,
// 		},
// 		{
// 			onError: (ctx) => {
// 				// Handle the error
// 				if (ctx.error.status === 403) {
// 					alert("Please verify your email address");
// 				}
// 				//you can also show the original error message
// 				alert(ctx.error.message);
// 			},
// 		}
// 	);
// };
  

export const signInWithGithub = async() => {
	await auth.api.signInSocial({
		provider: "github",
	});
}

export const signUp = async({firstname,lastname,username, email, password}) => {
    // await auth.api.signUpEmail({
	// 		body: {
				// firstname,
				// lastname,
				// email,
				// username,
				// password,
	// 		},
	// 	});
	try {
        await auth.api.signUpEmail({
					body: {
						firstname,
						lastname,
						email,
						username,
						password,
					},
				});

        return {
            success: true,
            message: "Signed up successfully."
        }
    } catch (error) {
        const e = error 

        return {
            success: false,
            message: e.message || "An unknown error occurred."
        }
    }
}