import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Info, Calculator } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const InvestmentAnalyzer = () => {
  const [inputs, setInputs] = useState({
    purchasePrice: '',
    downPaymentPercent: '20',
    interestRate: '7.5',
    loanTermYears: '30',
    annualRentalIncome: '',
    monthlyTaxes: '',
    monthlyInsurance: '',
    monthlyMaintenance: '',
    holdingPeriodYears: '10',
    appreciationRate: '3',
    discountRate: '8'
  });

  const [results, setResults] = useState({
    cocReturn: 0,
    irr: 0,
    npv: 0,
    monthlyPayment: 0,
    totalInvestment: 0,
    annualCashFlow: 0
  });

  useEffect(() => {
    calculateReturns();
  }, [inputs]);

  const calculateReturns = () => {
    const purchasePrice = parseFloat(inputs.purchasePrice) || 0;
    const downPaymentPercent = parseFloat(inputs.downPaymentPercent) || 0;
    const interestRate = parseFloat(inputs.interestRate) || 0;
    const loanTermYears = parseFloat(inputs.loanTermYears) || 0;
    const annualRentalIncome = parseFloat(inputs.annualRentalIncome) || 0;
    const monthlyTaxes = parseFloat(inputs.monthlyTaxes) || 0;
    const monthlyInsurance = parseFloat(inputs.monthlyInsurance) || 0;
    const monthlyMaintenance = parseFloat(inputs.monthlyMaintenance) || 0;
    const holdingPeriodYears = parseFloat(inputs.holdingPeriodYears) || 0;
    const appreciationRate = parseFloat(inputs.appreciationRate) || 0;
    const discountRate = parseFloat(inputs.discountRate) || 0;

    if (purchasePrice === 0) {
      setResults({ cocReturn: 0, irr: 0, npv: 0, monthlyPayment: 0, totalInvestment: 0, annualCashFlow: 0 });
      return;
    }

    // Calculate loan details
    const downPayment = purchasePrice * (downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTermYears * 12;

    // Monthly payment calculation
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);

    // Annual calculations
    const totalMonthlyExpenses = monthlyPayment + monthlyTaxes + monthlyInsurance + monthlyMaintenance;
    const annualExpenses = totalMonthlyExpenses * 12;
    const annualCashFlow = annualRentalIncome - annualExpenses;

    // Closing costs estimate (2% of purchase price)
    const closingCosts = purchasePrice * 0.02;
    const totalInvestment = downPayment + closingCosts;

    // Cash-on-Cash Return
    const cocReturn = totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;

    // Simplified IRR and NPV calculations
    const futureValue = purchasePrice * Math.pow(1 + appreciationRate / 100, holdingPeriodYears);
    const totalReturn = (futureValue - purchasePrice + (annualCashFlow * holdingPeriodYears)) / totalInvestment;
    const annualizedReturn = Math.pow(totalReturn + 1, 1 / holdingPeriodYears) - 1;
    const irr = annualizedReturn * 100;

    // Simple NPV calculation
    let npv = -totalInvestment;
    for (let year = 1; year <= holdingPeriodYears; year++) {
      const cashFlow = year === holdingPeriodYears ? annualCashFlow + (futureValue - purchasePrice) : annualCashFlow;
      npv += cashFlow / Math.pow(1 + discountRate / 100, year);
    }

    setResults({
      cocReturn,
      irr,
      npv,
      monthlyPayment,
      totalInvestment,
      annualCashFlow
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setInputs({ ...inputs, [field]: value });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <Card className="calculator-card animate-fade-in">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Calculator className="h-6 w-6" />
          Real Estate Investment Analyzer
        </CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Analyze cash-on-cash return (CoC), internal rate of return (IRR), and net present value (NPV)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Property Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary">Property Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="purchase-price">Purchase Price</Label>
              <Input
                id="purchase-price"
                type="number"
                placeholder="500000"
                value={inputs.purchasePrice}
                onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="down-payment">Down Payment (%)</Label>
              <Input
                id="down-payment"
                type="number"
                value={inputs.downPaymentPercent}
                onChange={(e) => handleInputChange('downPaymentPercent', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest-rate">Interest Rate (%)</Label>
              <Input
                id="interest-rate"
                type="number"
                step="0.1"
                value={inputs.interestRate}
                onChange={(e) => handleInputChange('interestRate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loan-term">Loan Term (Years)</Label>
              <Input
                id="loan-term"
                type="number"
                value={inputs.loanTermYears}
                onChange={(e) => handleInputChange('loanTermYears', e.target.value)}
              />
            </div>
          </div>

          {/* Income & Expenses */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary">Income & Expenses</h3>
            
            <div className="space-y-2">
              <Label htmlFor="rental-income">Annual Rental Income</Label>
              <Input
                id="rental-income"
                type="number"
                placeholder="60000"
                value={inputs.annualRentalIncome}
                onChange={(e) => handleInputChange('annualRentalIncome', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly-taxes">Monthly Property Taxes</Label>
              <Input
                id="monthly-taxes"
                type="number"
                placeholder="800"
                value={inputs.monthlyTaxes}
                onChange={(e) => handleInputChange('monthlyTaxes', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly-insurance">Monthly Insurance</Label>
              <Input
                id="monthly-insurance"
                type="number"
                placeholder="200"
                value={inputs.monthlyInsurance}
                onChange={(e) => handleInputChange('monthlyInsurance', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly-maintenance">Monthly Maintenance</Label>
              <Input
                id="monthly-maintenance"
                type="number"
                placeholder="400"
                value={inputs.monthlyMaintenance}
                onChange={(e) => handleInputChange('monthlyMaintenance', e.target.value)}
              />
            </div>
          </div>

          {/* Analysis Parameters */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary">Analysis Parameters</h3>
            
            <div className="space-y-2">
              <Label htmlFor="holding-period" className="flex items-center gap-2">
                Holding Period (Years)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>How long you plan to hold the property</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="holding-period"
                type="number"
                value={inputs.holdingPeriodYears}
                onChange={(e) => handleInputChange('holdingPeriodYears', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="appreciation-rate">Expected Appreciation (%)</Label>
              <Input
                id="appreciation-rate"
                type="number"
                step="0.1"
                value={inputs.appreciationRate}
                onChange={(e) => handleInputChange('appreciationRate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount-rate" className="flex items-center gap-2">
                Discount Rate (%)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Required rate of return for NPV calculation</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="discount-rate"
                type="number"
                step="0.1"
                value={inputs.discountRate}
                onChange={(e) => handleInputChange('discountRate', e.target.value)}
              />
            </div>

            {/* Quick Results Preview */}
            <div className="pt-4 space-y-2">
              <div className="text-sm text-muted-foreground">Monthly Payment:</div>
              <div className="gold-highlight">{formatCurrency(results.monthlyPayment)}</div>
              
              <div className="text-sm text-muted-foreground">Total Investment:</div>
              <div className="gold-highlight">{formatCurrency(results.totalInvestment)}</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Results Summary */}
        <div className="space-y-4">
          <h3 className="font-semibold text-xl text-primary text-center">Investment Analysis Results</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="result-highlight text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                Cash-on-Cash Return
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <div className="space-y-2">
                        <p className="font-semibold">Cash-on-Cash Return Standards:</p>
                        <p>• 6%–10% → Average to decent return (stable, lower-risk markets)</p>
                        <p>• 10%–15% → Strong return (value-add or emerging markets)</p>
                        <p>• 15%+ → Excellent return (higher risk, distressed properties, or creative financing)</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-primary text-2xl font-bold">{formatPercentage(results.cocReturn)}</div>
              <div className="text-xs text-muted-foreground mt-1">Annual Cash Flow / Total Investment</div>
            </div>

            <div className="result-highlight text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                Internal Rate of Return
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <div className="space-y-2">
                        <p className="font-semibold">What's a "Good" IRR?</p>
                        <p>• Passive Investors: 10%–15% (lower risk, stable markets)</p>
                        <p>• Active Investors (Value-Add): 15%–25% (requires hands-on effort)</p>
                        <p>• Aggressive Investors (Development, Short-Term Rentals): 20%–30%+ (high risk/reward)</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-primary text-2xl font-bold">{formatPercentage(results.irr)}</div>
              <div className="text-xs text-muted-foreground mt-1">Annualized total return</div>
            </div>

            <div className="result-highlight text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                Net Present Value
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <div className="space-y-2">
                        <p className="font-semibold">NPV Guidelines:</p>
                        <p>• Positive NPV = Good (exceeds your required return)</p>
                        <p>• Higher NPV = Better (more profit in present-value terms)</p>
                        <p>• Negative NPV = Walk away (doesn't meet your return threshold)</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-primary text-2xl font-bold">{formatCurrency(results.npv)}</div>
              <div className="text-xs text-muted-foreground mt-1">Present value of future cash flows</div>
            </div>
          </div>

          <div className="result-highlight bg-accent/20">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Annual Cash Flow</div>
              <div className="text-primary text-xl font-bold">{formatCurrency(results.annualCashFlow)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentAnalyzer;
