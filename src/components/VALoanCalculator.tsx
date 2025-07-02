
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const VALoanCalculator = () => {
  const [countyLimit, setCountyLimit] = useState<string>('');
  const [existingLoanAmount, setExistingLoanAmount] = useState<string>('');
  const [results, setResults] = useState({
    maxEntitlement: 0,
    usedEntitlement: 0,
    remainingEntitlement: 0,
    maxNewLoan: 0
  });

  useEffect(() => {
    calculateEntitlement();
  }, [countyLimit, existingLoanAmount]);

  const calculateEntitlement = () => {
    const limit = parseFloat(countyLimit) || 0;
    const existing = parseFloat(existingLoanAmount) || 0;

    const maxEntitlement = limit * 0.25;
    const usedEntitlement = existing * 0.25;
    const remainingEntitlement = Math.max(0, maxEntitlement - usedEntitlement);
    const maxNewLoan = remainingEntitlement * 4;

    setResults({
      maxEntitlement,
      usedEntitlement,
      remainingEntitlement,
      maxNewLoan
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="calculator-card animate-fade-in">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          🇺🇸 VA Loan Entitlement Calculator
        </CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Calculate your remaining VA loan entitlement and maximum zero-down loan amount
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="county-limit" className="flex items-center gap-2">
                County Conforming Loan Limit
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The maximum loan amount allowed in your county</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="county-limit"
                type="number"
                placeholder="766,550"
                value={countyLimit}
                onChange={(e) => setCountyLimit(e.target.value)}
                className="text-lg"
              />
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => window.open('https://www.fhfa.gov/DataTools/Downloads/Pages/Conforming-Loan-Limits.aspx', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Find Your County Limit
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="existing-loan" className="flex items-center gap-2">
                Existing VA Loan Amount (Optional)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Current outstanding balance of any existing VA loan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="existing-loan"
                type="number"
                placeholder="0"
                value={existingLoanAmount}
                onChange={(e) => setExistingLoanAmount(e.target.value)}
                className="text-lg"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary">Your VA Loan Benefits</h3>
            
            <div className="result-highlight">
              <div className="flex justify-between items-center">
                <span className="font-medium">Maximum Entitlement:</span>
                <span className="gold-highlight">{formatCurrency(results.maxEntitlement)}</span>
              </div>
            </div>

            <div className="result-highlight">
              <div className="flex justify-between items-center">
                <span className="font-medium">Entitlement Used:</span>
                <span className="gold-highlight">{formatCurrency(results.usedEntitlement)}</span>
              </div>
            </div>

            <div className="result-highlight">
              <div className="flex justify-between items-center">
                <span className="font-medium">Remaining Entitlement:</span>
                <span className="gold-highlight">{formatCurrency(results.remainingEntitlement)}</span>
              </div>
            </div>

            <div className="result-highlight bg-accent/20">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Max Loan (Zero Down):</span>
                <span className="gold-highlight text-xl">{formatCurrency(results.maxNewLoan)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VALoanCalculator;
