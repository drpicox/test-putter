const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Paths
const HOLES_DIR = path.join(__dirname, '../public/data/holes');
const SUMMARY_PATH = path.join(__dirname, '../public/data/holes-summary.json');

// Function to build the summary
async function buildHoleSummary() {
  try {
    // Create a list to store hole summaries
    const summary = [];
    
    // Get all YAML files
    const files = fs.readdirSync(HOLES_DIR).filter(file => file.endsWith('.yaml'));
    
    // Process each file
    for (const file of files) {
      const filePath = path.join(HOLES_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const holeData = yaml.load(content);
      
      // Extract only the summary information
      summary.push({
        id: holeData.id,
        name: holeData.name,
        description: holeData.description,
        difficulty: holeData.difficulty,
        par: holeData.par
      });
    }
    
    // Sort by ID (numeric sort)
    summary.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    
    // Write the summary to a JSON file
    fs.writeFileSync(SUMMARY_PATH, JSON.stringify(summary, null, 2));
    
    console.log(`Successfully generated summary at ${SUMMARY_PATH}`);
    console.log(`Total holes processed: ${summary.length}`);
  } catch (error) {
    console.error('Error building hole summary:', error);
    process.exit(1);
  }
}

// Run the function
buildHoleSummary();