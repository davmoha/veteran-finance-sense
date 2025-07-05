import VALoanCalculator from '@/components/VALoanCalculator';

const VALoanOnly = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header - Solid Blue */}
      <div className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            The VA Home Loan Demystified
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90">
            VA home loan entitlement made easy.
          </p>
          <p className="text-lg max-w-3xl mx-auto opacity-80">
            Built by veterans, for veterans who understand the benefits of using
            the VA home loan. You earned it, so why not use it.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Page Headline */}
        <div className="text-left space-y-4">
          <p className="text-lg leading-relaxed text-foreground">
            Many veterans overlook the VA home loan entitlement, despite it being one of their most valuable benefits. A primary reason for this underutilization is that realtors and some lenders frequently misunderstand how these entitlements work, leading them to misrepresent the process as complex and consequently discouraging buyers. The entitlement itself is the amount the Department of Veterans Affairs (VA) guarantees on a home loan, and it plays a crucial role in determining the maximum amount a veteran can borrow without a down payment. In essence, it's the highest amount the VA will repay a lender should a veteran default on the loan. Utilize the fields provided below to ascertain your total entitlement. Furthermore, if you already possess a VA-backed home loan, this tool can illustrate your remaining entitlement.
          </p>
        </div>

        {/* VA Loan Calculator Section */}
        <VALoanCalculator />

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

export default VALoanOnly;
