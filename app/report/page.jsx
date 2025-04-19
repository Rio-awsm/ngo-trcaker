'use client';

import Navbar from '@/components/Navbar';
import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';


export default function ReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const formattedData = {
        ...data,
        peopleHelped: parseInt(data.peopleHelped),
        eventsConducted: parseInt(data.eventsConducted),
        fundsUtilized: parseInt(data.fundsUtilized),
      };
      
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit report');
      }
      
      reset();
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Submit Monthly Impact Report</h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label" htmlFor="ngoId">NGO ID</label>
                  <input
                    id="ngoId"
                    type="text"
                    className="form-input"
                    {...register('ngoId', { required: 'NGO ID is required' })}
                  />
                  {errors.ngoId && <p className="form-error">{errors.ngoId.message}</p>}
                </div>
                
                <div>
                  <label className="form-label" htmlFor="ngoName">NGO Name</label>
                  <input
                    id="ngoName"
                    type="text"
                    className="form-input"
                    {...register('ngoName', { required: 'NGO Name is required' })}
                  />
                  {errors.ngoName && <p className="form-error">{errors.ngoName.message}</p>}
                </div>
              </div>
              
              <div>
                <label className="form-label" htmlFor="month">Reporting Month</label>
                <input
                  id="month"
                  type="month"
                  className="form-input"
                  {...register('month', { required: 'Month is required' })}
                />
                {errors.month && <p className="form-error">{errors.month.message}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="form-label" htmlFor="peopleHelped">People Helped</label>
                  <input
                    id="peopleHelped"
                    type="number"
                    min="0"
                    className="form-input"
                    {...register('peopleHelped', { 
                      required: 'This field is required',
                      min: { value: 0, message: 'Value must be 0 or higher' },
                      valueAsNumber: true
                    })}
                  />
                  {errors.peopleHelped && <p className="form-error">{errors.peopleHelped.message}</p>}
                </div>
                
                <div>
                  <label className="form-label" htmlFor="eventsConducted">Events Conducted</label>
                  <input
                    id="eventsConducted"
                    type="number"
                    min="0"
                    className="form-input"
                    {...register('eventsConducted', { 
                      required: 'This field is required',
                      min: { value: 0, message: 'Value must be 0 or higher' },
                      valueAsNumber: true
                    })}
                  />
                  {errors.eventsConducted && <p className="form-error">{errors.eventsConducted.message}</p>}
                </div>
                
                <div>
                  <label className="form-label" htmlFor="fundsUtilized">Funds Utilized (INR)</label>
                  <input
                    id="fundsUtilized"
                    type="number"
                    min="0"
                    className="form-input"
                    {...register('fundsUtilized', { 
                      required: 'This field is required',
                      min: { value: 0, message: 'Value must be 0 or higher' },
                      valueAsNumber: true
                    })}
                  />
                  {errors.fundsUtilized && <p className="form-error">{errors.fundsUtilized.message}</p>}
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="btn-primary flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : submitSuccess ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Submitted!
                    </>
                  ) : (
                    'Submit Report'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}