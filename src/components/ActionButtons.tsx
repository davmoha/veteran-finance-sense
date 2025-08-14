
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, RotateCcw, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useSecureFormData } from '@/hooks/useSecureFormData';

const ActionButtons = () => {
  const { formRef, getFormData, resetFormInputs } = useSecureFormData();
  const handleShare = async () => {
    const shareData = {
      title: 'Invest iSense - VA Loan & Investment Calculator',
      text: 'Check out this powerful tool for veteran real estate investors!',
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully!",
          description: "Thanks for spreading the word to fellow veterans.",
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Share this link with your fellow veteran investors.",
        });
      }
    } catch (error) {
      toast({
        title: "Share failed",
        description: "Please copy the URL manually to share.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    resetFormInputs();
    toast({
      title: "Calculator reset",
      description: "All fields have been cleared. Start fresh!",
    });
  };

  const handleExport = () => {
    try {
      // Define secure form data selectors using document.querySelector for cross-component access
      const getInputValue = (id: string): string => {
        const element = document.getElementById(id) as HTMLInputElement;
        console.log(`Looking for element with ID: ${id}`, element);
        console.log(`Element value: ${element?.value}`);
        return element?.value || '0';
      };

      // Debug: Log all input elements in the document
      const allInputs = document.querySelectorAll('input[type="number"]');
      console.log('All number inputs found:', allInputs);
      allInputs.forEach(input => {
        console.log(`Input ID: ${input.id}, Value: ${(input as HTMLInputElement).value}`);
      });

      // Get VA loan data
      const vaData = {
        existingLoanAmount: getInputValue('existing-loan'),
        countyLimit: getInputValue('county-limit')
      };

      // Get investment data
      const investmentData = {
        purchasePrice: getInputValue('purchase-price'),
        downPayment: getInputValue('down-payment'),
        interestRate: getInputValue('interest-rate'),
        loanTerm: getInputValue('loan-term'),
        closingCosts: getInputValue('closing-costs'),
        rentalIncome: getInputValue('rental-income'),
        monthlyTaxes: getInputValue('monthly-taxes'),
        monthlyInsurance: getInputValue('monthly-insurance'),
        monthlyMaintenance: getInputValue('monthly-maintenance'),
        monthlyManagementFee: getInputValue('monthly-management-fee'),
        holdingPeriod: getInputValue('holding-period'),
        appreciationRate: getInputValue('appreciation-rate'),
        discountRate: getInputValue('discount-rate')
      };

      console.log('VA Data:', vaData);
      console.log('Investment Data:', investmentData);

      let exportData = 'Invest iSense - Analysis Results\n';
      exportData += '=====================================\n\n';
      exportData += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
      
      // VA Loan Analysis
      const vaResults = document.querySelector('[data-testid="va-loan-results"]');
      if (vaResults) {
        exportData += 'VA LOAN ANALYSIS\n';
        exportData += '================\n\n';
        
        exportData += 'Input Parameters:\n';
        exportData += `• Existing VA Loan Amount: $${parseFloat(vaData.existingLoanAmount).toLocaleString()}\n`;
        exportData += `• County Conforming Loan Limit: $${parseFloat(vaData.countyLimit).toLocaleString()}\n\n`;
        
        exportData += 'Results:\n';
        const maxEntitlement = vaResults.querySelector('[data-testid="max-entitlement"]')?.textContent || 'Not calculated';
        const remainingEntitlement = vaResults.querySelector('[data-testid="remaining-entitlement"]')?.textContent || 'Not calculated';
        const maxLoanAmount = vaResults.querySelector('[data-testid="max-loan-amount"]')?.textContent || 'Not calculated';
        
        exportData += `• Maximum Entitlement: ${maxEntitlement}\n`;
        exportData += `• Remaining Entitlement: ${remainingEntitlement}\n`;
        exportData += `• Max Loan Amount: ${maxLoanAmount}\n\n`;
      }
      
      // Investment Analysis
      const investmentResults = document.querySelector('[data-testid="investment-results"]');
      if (investmentResults) {
        exportData += 'INVESTMENT ANALYSIS\n';
        exportData += '==================\n\n';
        
        exportData += 'Property Details:\n';
        exportData += `• Purchase Price: $${parseFloat(investmentData.purchasePrice).toLocaleString()}\n`;
        exportData += `• Down Payment: ${investmentData.downPayment}%\n`;
        exportData += `• Interest Rate: ${investmentData.interestRate}%\n`;
        exportData += `• Loan Term: ${investmentData.loanTerm} years\n\n`;
        
        exportData += 'Income & Expenses:\n';
        exportData += `• Monthly Rental Income: $${parseFloat(investmentData.rentalIncome).toLocaleString()}\n`;
        exportData += `• Monthly Property Taxes: $${parseFloat(investmentData.monthlyTaxes).toLocaleString()}\n`;
        exportData += `• Monthly Insurance: $${parseFloat(investmentData.monthlyInsurance).toLocaleString()}\n`;
        exportData += `• Monthly Maintenance: $${parseFloat(investmentData.monthlyMaintenance).toLocaleString()}\n`;
        exportData += `• Monthly Management Fee: $${parseFloat(investmentData.monthlyManagementFee).toLocaleString()}\n\n`;
        
        exportData += 'Analysis Parameters:\n';
        exportData += `• Holding Period: ${investmentData.holdingPeriod} years\n`;
        exportData += `• Expected Appreciation: ${investmentData.appreciationRate}%\n`;
        exportData += `• Discount Rate: ${investmentData.discountRate}%\n\n`;
        
        // Results
        exportData += 'Investment Results:\n';
        const cocReturn = investmentResults.querySelector('[data-testid="coc-return"]')?.textContent || 'Not calculated';
        const irr = investmentResults.querySelector('[data-testid="irr"]')?.textContent || 'Not calculated';
        const npv = investmentResults.querySelector('[data-testid="npv"]')?.textContent || 'Not calculated';
        const annualCashFlow = investmentResults.querySelector('[data-testid="annual-cash-flow"]')?.textContent || 'Not calculated';
        
        exportData += `• Cash-on-Cash Return: ${cocReturn}\n`;
        exportData += `• Internal Rate of Return: ${irr}\n`;
        exportData += `• Net Present Value: ${npv}\n`;
        exportData += `• Annual Cash Flow: ${annualCashFlow}\n\n`;
        
        // Generate recommendations
        exportData += 'INVESTMENT RECOMMENDATION\n';
        exportData += '========================\n\n';
        
        const cocValue = parseFloat(cocReturn.replace('%', '')) || 0;
        const irrValue = parseFloat(irr.replace('%', '')) || 0;
        const npvValue = parseFloat(npv.replace(/[$,]/g, '')) || 0;
        const cashFlowValue = parseFloat(annualCashFlow.replace(/[$,]/g, '')) || 0;
        
        let recommendation = '';
        let score = 0;
        
        // Score based on metrics
        if (cocValue >= 15) score += 3;
        else if (cocValue >= 10) score += 2;
        else if (cocValue >= 6) score += 1;
        
        if (irrValue >= 20) score += 3;
        else if (irrValue >= 15) score += 2;
        else if (irrValue >= 10) score += 1;
        
        if (npvValue > 50000) score += 3;
        else if (npvValue > 0) score += 2;
        else if (npvValue > -25000) score += 1;
        
        if (cashFlowValue > 0) score += 2;
        
        // Generate recommendation based on score
        if (score >= 9) {
          recommendation = '🟢 STRONG BUY - This property shows excellent investment potential with strong returns across all key metrics. The combination of positive cash flow, high CoC return, and substantial NPV suggests this could be a very profitable investment.';
        } else if (score >= 6) {
          recommendation = '🟡 CONSIDER - This property has decent investment potential but may require careful consideration. Review the cash flow projections and market conditions before proceeding. Consider negotiating a lower purchase price to improve returns.';
        } else if (score >= 3) {
          recommendation = '🟠 MARGINAL - This investment shows mixed results. The returns may not justify the risk. Consider looking for better opportunities or significantly improving the terms of this deal.';
        } else {
          recommendation = '🔴 AVOID - Based on the current analysis, this property does not meet strong investment criteria. The returns are too low relative to the risk, and you may want to pass on this opportunity.';
        }
        
        exportData += recommendation + '\n\n';
        
        exportData += 'Key Considerations:\n';
        if (cashFlowValue <= 0) {
          exportData += '• ⚠️  Negative cash flow requires careful budgeting\n';
        }
        if (cocValue < 8) {
          exportData += '• ⚠️  CoC return below market average (8-12%)\n';
        }
        if (npvValue < 0) {
          exportData += '• ⚠️  Negative NPV suggests returns below required rate\n';
        }
        if (irrValue < 12) {
          exportData += '• ⚠️  IRR below typical real estate investment threshold\n';
        }
        
        exportData += '\n';
      }
      
      exportData += 'DISCLAIMER\n';
      exportData += '==========\n';
      exportData += 'This analysis is for educational purposes only and should not be considered as financial advice.\n';
      exportData += 'Always consult with qualified financial and real estate professionals before making investment decisions.\n';
      exportData += 'Market conditions, interest rates, and property values can change significantly.\n';
      exportData += 'Perform your own due diligence and consider all risks before investing.';

      // Create and download file securely
      const blob = new Blob([exportData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invest-isense-results.txt';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Results exported!",
        description: "Your analysis has been saved to a text file.",
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export failed",
        description: "Unable to export results. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="calculator-card" ref={formRef}>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleExport}
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            <Download className="h-5 w-5 mr-2" />
            Analysis Recommendation
          </Button>
          
          <Button 
            onClick={handleShare}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            size="lg"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Results
          </Button>
          
          <Button 
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Reset Calculator
          </Button>
        </div>
        
        <div className="text-center mt-4 text-sm text-muted-foreground">
          <p>💡 <strong>Pro Tip:</strong> Bookmark this page for quick access to your calculations!</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionButtons;
