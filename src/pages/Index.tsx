
import VALoanCalculator from '@/components/VALoanCalculator';
import InvestmentAnalyzer from '@/components/InvestmentAnalyzer';
import ActionButtons from '@/components/ActionButtons';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="patriot-gradient text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Invest <span className="text-accent">iSense</span>
          </h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            Empowering Veteran Real Estate Investors
          </p>
          <p className="text-lg max-w-3xl mx-auto opacity-80">
            Calculate your VA loan entitlement and analyze investment properties with precision. 
            Built by veterans, for veterans who understand the power of strategic real estate investing.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* VA Loan Calculator Section */}
        <VALoanCalculator />

        <Separator className="my-8" />

        {/* Investment Analyzer Section */}
        <InvestmentAnalyzer />

        <Separator className="my-8" />

        {/* Action Buttons */}
        <ActionButtons />

        {/* Footer */}
        <div className="text-center py-8 space-y-4">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This tool is for educational and informational purposes only. 
              Results are estimates and should not be considered financial advice.
            </p>
            <p>
              Always consult with qualified financial advisors, real estate professionals, 
              and VA loan specialists before making investment decisions.
            </p>
          </div>
          
          <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
            <span>🇺🇸 Built with pride for our veterans</span>
            <span>•</span>
            <span>No data stored or tracked</span>
            <span>•</span>
            <span>100% browser-based calculations</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
