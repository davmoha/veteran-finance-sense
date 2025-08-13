
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, RotateCcw, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ActionButtons = () => {
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
    // Clear all form inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      if (input.type === 'number' || input.type === 'text') {
        input.value = '';
        // Trigger change event to update React state
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
      }
    });

    toast({
      title: "Calculator reset",
      description: "All fields have been cleared. Start fresh!",
    });
  };

  const handleExport = () => {
    let exportData = 'Invest iSense - Analysis Results\n';
    exportData += '=====================================\n\n';
    exportData += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    
    // Extract VA Loan input parameters and results
    const vaResults = document.querySelector('[data-testid="va-loan-results"]');
    if (vaResults) {
      exportData += 'VA LOAN ANALYSIS\n';
      exportData += '================\n\n';
      
      // Input parameters
      exportData += 'Input Parameters:\n';
      const existingLoanAmount = (document.querySelector('#existing-loan') as HTMLInputElement)?.value || '0';
      const countyLimit = (document.querySelector('#county-limit') as HTMLInputElement)?.value || '0';
      exportData += `• Existing VA Loan Amount: $${parseFloat(existingLoanAmount).toLocaleString()}\n`;
      exportData += `• County Conforming Loan Limit: $${parseFloat(countyLimit).toLocaleString()}\n\n`;
      
      // Results
      exportData += 'Results:\n';
      const maxEntitlement = vaResults.querySelector('[data-testid="max-entitlement"]')?.textContent || 'Not calculated';
      const remainingEntitlement = vaResults.querySelector('[data-testid="remaining-entitlement"]')?.textContent || 'Not calculated';
      const maxLoanAmount = vaResults.querySelector('[data-testid="max-loan-amount"]')?.textContent || 'Not calculated';
      
      exportData += `• Maximum Entitlement: ${maxEntitlement}\n`;
      exportData += `• Remaining Entitlement: ${remainingEntitlement}\n`;
      exportData += `• Max Loan Amount: ${maxLoanAmount}\n\n`;
    }
    
    // Extract Investment Analysis input parameters and results
    const investmentResults = document.querySelector('[data-testid="investment-results"]');
    if (investmentResults) {
      exportData += 'INVESTMENT ANALYSIS\n';
      exportData += '==================\n\n';
      
      // Input parameters
      exportData += 'Property Details:\n';
      const purchasePrice = (document.querySelector('#purchase-price') as HTMLInputElement)?.value || '0';
      const downPayment = (document.querySelector('#down-payment') as HTMLInputElement)?.value || '0';
      const interestRate = (document.querySelector('#interest-rate') as HTMLInputElement)?.value || '0';
      const loanTerm = (document.querySelector('#loan-term') as HTMLInputElement)?.value || '0';
      
      exportData += `• Purchase Price: $${parseFloat(purchasePrice).toLocaleString()}\n`;
      exportData += `• Down Payment: ${downPayment}%\n`;
      exportData += `• Interest Rate: ${interestRate}%\n`;
      exportData += `• Loan Term: ${loanTerm} years\n\n`;
      
      exportData += 'Income & Expenses:\n';
      const rentalIncome = (document.querySelector('#rental-income') as HTMLInputElement)?.value || '0';
      const monthlyTaxes = (document.querySelector('#monthly-taxes') as HTMLInputElement)?.value || '0';
      const monthlyInsurance = (document.querySelector('#monthly-insurance') as HTMLInputElement)?.value || '0';
      const monthlyMaintenance = (document.querySelector('#monthly-maintenance') as HTMLInputElement)?.value || '0';
      const monthlyManagementFee = (document.querySelector('#monthly-management-fee') as HTMLInputElement)?.value || '0';
      
      exportData += `• Monthly Rental Income: $${parseFloat(rentalIncome).toLocaleString()}\n`;
      exportData += `• Monthly Property Taxes: $${parseFloat(monthlyTaxes).toLocaleString()}\n`;
      exportData += `• Monthly Insurance: $${parseFloat(monthlyInsurance).toLocaleString()}\n`;
      exportData += `• Monthly Maintenance: $${parseFloat(monthlyMaintenance).toLocaleString()}\n`;
      exportData += `• Monthly Management Fee: $${parseFloat(monthlyManagementFee).toLocaleString()}\n\n`;
      
      exportData += 'Analysis Parameters:\n';
      const holdingPeriod = (document.querySelector('#holding-period') as HTMLInputElement)?.value || '0';
      const appreciationRate = (document.querySelector('#appreciation-rate') as HTMLInputElement)?.value || '0';
      const discountRate = (document.querySelector('#discount-rate') as HTMLInputElement)?.value || '0';
      
      exportData += `• Holding Period: ${holdingPeriod} years\n`;
      exportData += `• Expected Appreciation: ${appreciationRate}%\n`;
      exportData += `• Discount Rate: ${discountRate}%\n\n`;
      
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

    // Create and download file
    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invest-isense-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Results exported!",
      description: "Your analysis has been saved to a text file.",
    });
  };

  return (
    <Card className="calculator-card">
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
