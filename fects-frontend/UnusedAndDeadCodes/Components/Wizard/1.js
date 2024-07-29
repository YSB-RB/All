"use client"


import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Wizard = ({ steps, userId, formData, setFormData, submitForm, children }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    };

    const prevStep = () => {
        setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const isComplete = (step) => {
        return formData[step] && Object.keys(formData[step]).length > 0;
    };

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <Tab.Group selectedIndex={currentStep} onChange={setCurrentStep}>
                    <Tab.List className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1">
                        {steps.map((step, index) => (
                            <Tab
                                key={step.id}
                                className={({ selected }) =>
                                    classNames(
                                        'w-full py-2.5 text-sm leading-5 font-medium text-center rounded-lg',
                                        selected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                                    )
                                }
                            >
                                <span className="flex items-center justify-center space-x-2">
                                    {step.icon}
                                    <span>{step.label}</span>
                                    {isComplete(step.id) && <span className="text-green-500">✔</span>}
                                </span>
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        {children.map((child, index) => (
                            <Tab.Panel key={index}>
                                {child}
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
            <div className="px-4 py-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                    {currentStep > 0 && (
                        <button
                            onClick={prevStep}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <ChevronLeftIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                            Previous
                        </button>
                    )}
                    {currentStep === steps.length - 1 && (
                        <button
                            onClick={submitForm}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
                        >
                            {userId ? 'Update User' : 'Create User'}
                        </button>
                    )}
                    {currentStep < steps.length - 1 && (
                        <button
                            onClick={nextStep}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
                        >
                            Next
                            <ChevronRightIcon className="h-5 w-5 ml-2" aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wizard;




