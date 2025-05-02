import { useEffect, useState } from "react";
import { Button } from "./ui/button";

// Helper component to determine if text needs "Show more" button
export function NotesExpandButton({ 
    text, 
    rowId, 
    isExpanded, 
    onToggle 
  }: { 
    text: string; 
    rowId: string; 
    isExpanded: boolean; 
    onToggle: () => void; 
  }) {
    const [showButton, setShowButton] = useState(false);
    
    useEffect(() => {
      // Check if the text overflows 3 lines
      const checkOverflow = () => {
        const element = document.getElementById(`notes-${rowId}`);
        if (element) {
          const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
          const height = element.scrollHeight;
          
          // If no valid lineHeight, use approximate calculation
          const lines = lineHeight ? height / lineHeight : height / 20;
          
          // Show button if more than 3 lines
          setShowButton(lines > 3);
        }
      };
      
      // Run on mount and window resize
      checkOverflow();
      window.addEventListener('resize', checkOverflow);
      
      return () => {
        window.removeEventListener('resize', checkOverflow);
      };
    }, [rowId, text]);
    
    if (!showButton) return null;
    
    return (
      <Button 
        variant="link" 
        size="sm" 
        className="p-0 h-auto mt-1 text-xs" 
        onClick={onToggle}
      >
        {isExpanded ? "Show less" : "Show more"}
      </Button>
    );
  }