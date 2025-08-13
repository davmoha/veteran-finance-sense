import { useRef, useCallback } from 'react';

interface FormElement extends HTMLElement {
  value?: string;
  type?: string;
}

export const useSecureFormData = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const sanitizeNumericInput = useCallback((value: string): string => {
    // Remove all non-numeric characters except decimal point and negative sign
    const cleaned = value.replace(/[^0-9.-]/g, '');
    
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Validate range (prevent extreme values)
    const numValue = parseFloat(cleaned);
    if (!isNaN(numValue)) {
      // Cap at reasonable investment property values
      if (numValue > 100000000) return '100000000'; // $100M max
      if (numValue < -1000000) return '-1000000'; // -$1M min
    }
    
    return cleaned;
  }, []);

  const getFormData = useCallback((selectors: Record<string, string>) => {
    const data: Record<string, string> = {};
    
    try {
      Object.entries(selectors).forEach(([key, selector]) => {
        if (!formRef.current) return;
        
        const element = formRef.current.querySelector(selector) as FormElement;
        if (element?.value !== undefined) {
          // Sanitize the value before storing
          data[key] = element.type === 'number' ? 
            sanitizeNumericInput(element.value) : 
            element.value.slice(0, 1000); // Limit text inputs to 1000 chars
        } else {
          data[key] = '0'; // Default fallback
        }
      });
    } catch (error) {
      console.warn('Error accessing form data:', error);
      // Return safe defaults
      Object.keys(selectors).forEach(key => {
        data[key] = '0';
      });
    }
    
    return data;
  }, [sanitizeNumericInput]);

  const resetFormInputs = useCallback(() => {
    try {
      if (!formRef.current) return;
      
      const inputs = formRef.current.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
      inputs.forEach(input => {
        if (input.type === 'number' || input.type === 'text') {
          input.value = '';
          // Trigger change event to update React state
          const event = new Event('input', { bubbles: true });
          input.dispatchEvent(event);
        }
      });
    } catch (error) {
      console.warn('Error resetting form inputs:', error);
    }
  }, []);

  return {
    formRef,
    getFormData,
    resetFormInputs,
    sanitizeNumericInput
  };
};