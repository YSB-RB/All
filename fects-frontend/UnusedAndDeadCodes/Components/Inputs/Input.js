import React from 'react'

const Input = () => {
    return (
        <>

            {/* Input with floadLabel */}
            <div class="bg-white p-4 rounded-lg">
                <div class="relative bg-inherit">
                    <input type="text" id="username" name="username" class="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me" />
                    <label for="username" class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Type inside me</label>
                </div>
            </div>







            {/* Input with icons */}
            <div className='flex '>
                <div class="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-12 h-12 text-white ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-900" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd" />
                    </svg>
                </div>

                <input type="search" x-model="input1"
                    class="w-80 h-12 px-4 py-1 bg-gray-100 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                    placeholder="Enter Name" />
            </div>

        </>
    )
}

export default Input




// const CreateUser = ({ userId }) => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [isLastStep, setIsLastStep] = useState(false);
//   const [isFirstStep, setIsFirstStep] = useState(false);

//   const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
//   const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
//   const [authorithies, setAuthorities] = useState(null);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//     images: [],
//     address: {
//       addressOne: "",
//       addressTwo: "",
//       city: "",
//       state: "",
//       zipCode: "",
//       county: "",
//       country: "",
//     },
//     phone: {
//       phoneNumber: "",
//       phoneType: "LANDLINE",
//     },
//     gender: "",
//     maritalStatus: "",
//     birthdate: "",
//     authorities: [],
//     role: "",
//     status: "",
//     tokenExpired: false,
//     accountNotExpired: false,
//     accountNotLocked: false,
//     credentialNotExpired: false,
//     monthlyNewsletterSubscription: false,
//     allowPrivateMessages: false,
//     allowNotificationWhenSomeoneComments: false,
//     allowNotificationWhenSomeoneLikes: false,
//   });


//   const nextStep = () => {
//     const index = sequence.indexOf(currentStep);
//     setCurrentStep(sequence[index + 1]);
//   };

//   const prevStep = () => {
//     const index = sequence.indexOf(currentStep);
//     setCurrentStep(sequence[index - 1]);
//   };

//   const isComplete = (stepId) =>
//     sequence.indexOf(stepId) < sequence.indexOf(currentStep);

//   const submitForm = async (e) => {
//     e.preventDefault();

//     const errors = {};
//     if (!formData.firstName.trim()) {
//       errors.firstName = "FirstName is required";
//     }
//     if (!formData.lastName.trim()) {
//       errors.lastName = "FirstName is required";
//     }
//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       errors.email = "Invalid email format";
//     }
//     if (!formData.username.trim()) {
//       errors.username = "Username is required";
//     }
//     if (!formData.password.trim()) {
//       errors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       errors.password = "Password must be at least 8 characters";
//     }
//     if (!formData.confirmPassword.trim()) {
//       errors.confirmPassword = "Confirm Password is required";
//     } else if (formData.confirmPassword !== formData.password) {
//       errors.confirmPassword = "Passwords do not match";
//     }


//     formData.authorities = null;
//     if (userId) {
//       try {
//         const update = await fetch(
//           `http://localhost:8080/v1/api/appUser/${userId}`,
//           {
//             method: "PUT",
//             body: JSON.stringify(formData, setAuthorities(null)),
//             headers: {
//               "Content-type": "application/json",
//             },
//           }
//         );
//         const UserUpdate = await update.json();
//         setFormData(UserUpdate);
//         history.push("/users");
//       } catch (err) {
//         console.log("Error in Update User", err);
//       }
//     } else {
//       try {
//         const response = await fetch("http://localhost:8080/v1/api/appUser", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         });
//         const data = await response.json();
//         setFormData({
//           firstName: "",
//           lastName: "",
//           username: "",
//           email: "",
//           password: "",
//           images: [],
//           phoneNumber: "",
//           phoneType: "",
//           address: {
//             addressOne: "",
//             addressTwo: "",
//             city: "",
//             state: "",
//             zipCode: "",
//             county: "",
//             country: "",
//           },
//           gender: "",
//           maritalStatus: "",
//           birthdate: "",
//           role: "",
//           tokenExpired: false,
//           accountNotExpired: false,
//           accountNotLocked: false,
//           credentialNotExpired: false,
//           monthlyNewsletterSubscription: false,
//           allowPrivateMessages: false,
//           allowNotificationWhenSomeoneComments: false,
//           allowNotificationWhenSomeoneLikes: false,
//         });
//         history.push("/users");
//       } catch (error) {
//         console.error("Error:", error);
//         alert("Failed to submit data");
//       }
//     }
//   };

//   // If userId exists, fetch user data and populate the form

//   useEffect(() => {
//     if (userId) {
//       const fetchUserData = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:8080/v1/api/appUser/${userId}`
//           );
//           const user = response.data;
//           setFormData(user);
//         } catch (err) {
//           console.log("Error in Fetch Api at Edit User", err);
//         }
//       };
//       fetchUserData();
//     }
//   }, [userId]);

//   return (

//     <div className="sm:px-6 w-[1240px] m-auto">
//       <HeaderMain title="Create User" />
//       <div className="w-[600px] py-4 px-8 m-auto ">
//         <Stepper
//           activeStep={activeStep}
//           isLastStep={(value) => setIsLastStep(value)}
//           isFirstStep={(value) => setIsFirstStep(value)}
//         >
//           <Step onClick={() => setActiveStep(0)}>
//             <HomeIcon className="h-5 w-5" />
//           </Step>
//           <Step onClick={() => setActiveStep(1)}>
//             <UserIcon className="h-5 w-5" />
//           </Step>
//           <Step onClick={() => setActiveStep(2)}>
//             <CogIcon className="h-5 w-5" />
//           </Step>
//         </Stepper>
//       </div>

//       <div>
// <div className="mt-16">
//   {activeStep === 0 && <BasicDetails />}
//   {activeStep === 1 && <AccountDetails />}
//   {activeStep === 2 && <PasswordSetting />}
// </div>
//         <div className="mt-16 flex justify-between">
//           <Button onClick={handlePrev} disabled={isFirstStep}>
//             Prev
//           </Button>
//           <Button onClick={handleNext} disabled={isLastStep}>
//             Next
//           </Button>
//         </div>
//       </div>

//     </div >

//   );


// }