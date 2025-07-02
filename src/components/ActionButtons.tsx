
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
    // Get current results from the page
    const results = document.querySelectorAll('.gold-highlight');
    let exportData = 'Invest iSense - Analysis Results\n';
    exportData += '=====================================\n\n';
    exportData += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    
    // This is a simplified export - in a real app you'd want to access actual state
    exportData += 'VA Loan Entitlement Results:\n';
    exportData += '• Maximum Entitlement: [See calculator]\n';
    exportData += '• Remaining Entitlement: [See calculator]\n';
    exportData += '• Max Loan Amount: [See calculator]\n\n';
    
    exportData += 'Investment Analysis Results:\n';
    exportData += '• Cash-on-Cash Return: [See calculator]\n';
    exportData += '• Internal Rate of Return: [See calculator]\n';
    exportData += '• Net Present Value: [See calculator]\n\n';
    
    exportData += 'Disclaimer: This tool is for educational purposes only.\n';
    exportData += 'Consult with financial and real estate professionals for personalized advice.';

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
            onClick={handleShare}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            size="lg"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Results
          </Button>
          
          <Button 
            onClick={handleExport}
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            <Download className="h-5 w-5 mr-2" />
            Export Analysis
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
