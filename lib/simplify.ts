export async function simplifyTextLocally(originalText: string): Promise<string> {
  if (!originalText || originalText.trim().length === 0) {
    console.log("Empty text received for simplification");
    return "No content was found in the document to simplify.";
  }

  console.log(`Simplifying text of length: ${originalText.length}`);

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

        let simplified = "Simplified Document Summary:\n\n";

        // Intro from the first paragraph (first 2-3 sentences)
        const introSentences = paragraphs[0].match(/[^.!?]+[.!?]/g)?.slice(0, 3).join(' ') ?? paragraphs[0];
        simplified += `Introduction:\n${introSentences.trim()}\n\n`;

        simplified += "Key Points:\n";
        const maxKeyPoints = Math.min(5, paragraphs.length - 1);

        // Process key points from paragraphs (first 2-3 sentences of each)
        for (let i = 1; i <= maxKeyPoints; i++) {
          const sentences = paragraphs[i].match(/[^.!?]+[.!?]/g);
          if (sentences && sentences.length > 0) {
            const snippet = sentences.slice(0, 3).join(' ').trim(); // Get first 2-3 sentences
            simplified += `\n- ${snippet}\n`;  // Start new line for each key point
          }
        }

        // Add a detailed summary based on the last paragraph and possibly the second-last one
        if (paragraphs.length > 2) {
          const lastParaSentences = paragraphs[paragraphs.length - 1].match(/[^.!?]+[.!?]/g);
          const secondLastParaSentences = paragraphs[paragraphs.length - 2].match(/[^.!?]+[.!?]/g);
          const summaryPart = [
            ...((lastParaSentences || []).slice(-2)),
            ...((secondLastParaSentences || []).slice(-2)),
          ].join(' ').trim();
          simplified += `\nSummary:\n${summaryPart.length > 0 ? summaryPart : "No detailed summary available."}`;
        } else if (paragraphs.length === 2) {
          simplified += `\nSummary:\n${paragraphs[1].substring(0, 200)}${paragraphs[1].length > 200 ? '...' : ''}`;
        }

        console.log("Simplification complete, length:", simplified.length);
        resolve(simplified);
      } catch (error) {
        console.error("Error in simplification process:", error);
        resolve("An error occurred while trying to simplify the document. Please try again.");
      }
    }, 1000); // Simulate a small processing delay
  });
}
