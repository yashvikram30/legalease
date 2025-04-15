export async function simplifyTextLocally(originalText: string): Promise<string> {
  if (!originalText || originalText.trim().length === 0) {
    console.log("Empty text received for simplification");
    return "No content was found in the document to simplify.";
  }

  console.log(`Simplifying legal document of length: ${originalText.length}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        if (originalText.trim().length < 50) {
          resolve(`The document appears to be very short (${originalText.length} characters). Here is the content: ${originalText}`);
          return;
        }

        // Split the document into paragraphs and remove empty ones
        const paragraphs = originalText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        
        if (paragraphs.length === 0) {
          resolve("The document was processed but no meaningful content was found.");
          return;
        }

        // Identify document category and type
        const documentInfo = identifyDocumentType(originalText);
        
        // Create the simplified document with improved formatting
        let simplified = `# Legal Document Summary\n\n`;
        
        // Add document type information
        simplified += `## Document Classification\n`;
        simplified += `**Category:** ${documentInfo.category}\n`;
        simplified += `**Type:** ${documentInfo.type}\n\n`;

        // Introduction section
        simplified += `## Overview\n`;
        const introSentences = paragraphs[0].match(/[^.!?]+[.!?]/g)?.slice(0, 3).join(' ') ?? paragraphs[0];
        simplified += `${introSentences.trim()}\n\n`;

        // Key provisions/points section with better formatting
        simplified += `## Key Provisions\n`;
        
        // Extract key points using more sophisticated approach
        const keyPoints = extractKeyPoints(paragraphs);
        keyPoints.forEach((point, index) => {
          simplified += `### Point ${index + 1}\n${point}\n\n`;
        });

        // Add a detailed executive summary
        simplified += `## Executive Summary\n`;
        const executiveSummary = generateExecutiveSummary(paragraphs);
        simplified += executiveSummary;

        // Add any detected dates, parties, or monetary values
        const entities = extractEntities(originalText);
        if (entities.dates.length > 0 || entities.parties.length > 0 || entities.monetaryValues.length > 0) {
          simplified += `\n## Important Details\n`;
          
          if (entities.parties.length > 0) {
            simplified += `**Parties Involved:** ${entities.parties.join(', ')}\n`;
          }
          
          if (entities.dates.length > 0) {
            simplified += `**Key Dates:** ${entities.dates.join(', ')}\n`;
          }
          
          if (entities.monetaryValues.length > 0) {
            simplified += `**Monetary Values:** ${entities.monetaryValues.join(', ')}\n`;
          }
        }

        console.log("Legal document simplification complete, length:", simplified.length);
        resolve(simplified);
      } catch (error) {
        console.error("Error in simplification process:", error);
        resolve("An error occurred while trying to simplify the legal document. Please try again.");
      }
    }, 1000);
  });
}

/**
 * Identifies the legal document category and specific type
 */
function identifyDocumentType(text: string): { category: string; type: string } {
  const textLower = text.toLowerCase();
  
  // Criminal law documents
  if (textLower.includes("criminal") || 
      textLower.includes("prosecution") || 
      textLower.includes("defendant") || 
      textLower.includes("sentenced") ||
      textLower.includes("felony") ||
      textLower.includes("misdemeanor")) {
    
    if (textLower.includes("plea") && textLower.includes("agreement")) {
      return { category: "Criminal Law", type: "Plea Agreement" };
    } else if (textLower.includes("indictment")) {
      return { category: "Criminal Law", type: "Indictment" };
    } else if (textLower.includes("warrant")) {
      return { category: "Criminal Law", type: "Warrant" };
    } else if (textLower.includes("probation")) {
      return { category: "Criminal Law", type: "Probation Order" };
    } else {
      return { category: "Criminal Law", type: "Criminal Legal Document" };
    }
  }
  
  // Civil law documents
  else if (textLower.includes("plaintiff") || 
           textLower.includes("civil action") || 
           textLower.includes("complaint filed") ||
           textLower.includes("civil case")) {
    
    if (textLower.includes("divorce") || textLower.includes("dissolution of marriage")) {
      return { category: "Family Law", type: "Divorce Petition/Decree" };
    } else if (textLower.includes("custody") || textLower.includes("visitation")) {
      return { category: "Family Law", type: "Child Custody Document" };
    } else if (textLower.includes("complaint") && textLower.includes("damages")) {
      return { category: "Civil Law", type: "Civil Complaint" };
    } else if (textLower.includes("class action")) {
      return { category: "Civil Law", type: "Class Action Litigation" };
    } else {
      return { category: "Civil Law", type: "Civil Legal Document" };
    }
  }
  
  // Property/Real Estate documents
  else if (textLower.includes("property") || 
           textLower.includes("real estate") || 
           textLower.includes("deed") ||
           textLower.includes("land") ||
           textLower.includes("mortgage") ||
           textLower.includes("lease")) {
    
    if (textLower.includes("purchase") && textLower.includes("agreement")) {
      return { category: "Real Estate Law", type: "Purchase Agreement" };
    } else if (textLower.includes("lease")) {
      return { category: "Real Estate Law", type: "Lease Agreement" };
    } else if (textLower.includes("deed")) {
      return { category: "Real Estate Law", type: "Property Deed" };
    } else if (textLower.includes("mortgage")) {
      return { category: "Real Estate Law", type: "Mortgage Document" };
    } else {
      return { category: "Real Estate Law", type: "Property Document" };
    }
  }
  
  // Contract documents
  else if (textLower.includes("agreement") || 
           textLower.includes("contract") || 
           textLower.includes("terms") ||
           textLower.includes("parties agree")) {
    
    if (textLower.includes("employment")) {
      return { category: "Contract Law", type: "Employment Contract" };
    } else if (textLower.includes("non-disclosure") || textLower.includes("confidentiality")) {
      return { category: "Contract Law", type: "Non-Disclosure Agreement" };
    } else if (textLower.includes("service")) {
      return { category: "Contract Law", type: "Service Agreement" };
    } else {
      return { category: "Contract Law", type: "Contract Document" };
    }
  }
  
  // Estate Planning documents
  else if (textLower.includes("will") || 
           textLower.includes("testament") || 
           textLower.includes("estate") ||
           textLower.includes("executor") ||
           textLower.includes("bequest") ||
           textLower.includes("heir")) {
    
    if (textLower.includes("last will")) {
      return { category: "Estate Law", type: "Last Will and Testament" };
    } else if (textLower.includes("trust")) {
      return { category: "Estate Law", type: "Trust Document" };
    } else if (textLower.includes("power of attorney")) {
      return { category: "Estate Law", type: "Power of Attorney" };
    } else {
      return { category: "Estate Law", type: "Estate Planning Document" };
    }
  }
  
  // Default if no specific type is identified
  return { category: "Legal Document", type: "Unspecified Legal Document" };
}

/**
 * Extract key points from the document paragraphs
 */
function extractKeyPoints(paragraphs: string[]): string[] {
  const keyPoints: string[] = [];
  
  // Skip first and last paragraphs as they're typically intro and conclusion
  const startIndex = 1;
  const endIndex = Math.min(paragraphs.length - 1, startIndex + 5);
  
  for (let i = startIndex; i < endIndex; i++) {
    const paragraph = paragraphs[i];
    
    // Look for sentences that suggest important points
    const sentences = paragraph.match(/[^.!?]+[.!?]/g) || [];
    
    // Prioritize sentences with key legal terms or structures
    const importantSentences = sentences.filter(sentence => {
      const lower = sentence.toLowerCase();
      return lower.includes("shall") || 
             lower.includes("must") || 
             lower.includes("required") ||
             lower.includes("agree") ||
             lower.includes("party") ||
             lower.includes("section") ||
             lower.includes("provision") ||
             lower.includes("clause") ||
             lower.includes("herein") ||
             lower.includes("pursuant to") ||
             lower.includes("notwithstanding");
    });
    
    if (importantSentences.length > 0) {
      // Use the important sentences if found
      keyPoints.push(importantSentences.slice(0, 2).join(' '));
    } else if (sentences.length > 0) {
      // Otherwise use the first couple of sentences
      keyPoints.push(sentences.slice(0, 2).join(' '));
    }
    
    // Limit to 5 key points
    if (keyPoints.length >= 5) break;
  }
  
  return keyPoints;
}

/**
 * Generate an executive summary from the document
 */
function generateExecutiveSummary(paragraphs: string[]): string {
  // Get meaningful content from first paragraph
  const introContent = paragraphs[0].slice(0, 200);
  
  // Get content from the last two paragraphs for conclusion
  const lastParagraphs = paragraphs.slice(-2);
  const conclusionContent = lastParagraphs.join(' ').slice(0, 300);
  
  // Select important mid-document content
  const midIndex = Math.floor(paragraphs.length / 2);
  const midContent = paragraphs[midIndex]?.slice(0, 200) || '';
  
  return `${introContent}...\n\n${midContent}...\n\n${conclusionContent}...`;
}

/**
 * Extract dates, parties and monetary values from the document
 */
function extractEntities(text: string): { dates: string[], parties: string[], monetaryValues: string[] } {
  const dates: string[] = [];
  const parties: string[] = [];
  const monetaryValues: string[] = [];
  
  // Extract dates (basic patterns)
  const dateMatches = text.match(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/g);
  if (dateMatches) {
    dates.push(...dateMatches.slice(0, 3)); // Limit to first 3 dates
  }
  
  // Extract parties (common party indicators)
  const partyMatches = text.match(/(?:plaintiff|defendant|petitioner|respondent|claimant)(?:\s+|\s*,\s*|\s+is\s+)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/g);
  if (partyMatches) {
    parties.push(...partyMatches.slice(0, 3)); // Limit to first 3 parties
  }
  
  // Extract monetary values
  const moneyMatches = text.match(/\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g);
  if (moneyMatches) {
    monetaryValues.push(...moneyMatches.slice(0, 3)); // Limit to first 3 monetary values
  }
  
  return { dates, parties, monetaryValues };
}