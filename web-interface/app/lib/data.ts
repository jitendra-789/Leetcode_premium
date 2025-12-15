import fs from 'fs/promises';
import path from 'path';
import Papa from 'papaparse';
import { Company, Problem, Duration } from '../types';

const COMPANIES_DIR = path.resolve(process.cwd(), '../Companies');

export async function getCompanies(): Promise<Company[]> {
    try {
        const jsonPath = path.join(COMPANIES_DIR, 'companies.json');
        const data = await fs.readFile(jsonPath, 'utf-8');
        const names: string[] = JSON.parse(data);
        return names.sort().map(name => ({ name }));
    } catch (error) {
        console.error("Error reading companies:", error);
        return [];
    }
}

export async function getCompanyData(companyName: string, duration: Duration): Promise<Problem[]> {
    let filename = "";
    switch (duration) {
        case "Thirty Days": filename = "1. Thirty Days.csv"; break;
        case "Three Months": filename = "2. Three Months.csv"; break;
        case "Six Months": filename = "3. Six Months.csv"; break;
        case "More Than Six Months": filename = "4. More Than Six Months.csv"; break;
        case "All": filename = "5. All.csv"; break;
        default: filename = "5. All.csv";
    }

    // Need to handle company names with special characters if any? 
    // Usually they are directory names, so they should be matched exactly.
    // URL decoding might be necessary if passed from route, but here we expect decoded string.

    const filePath = path.join(COMPANIES_DIR, companyName, filename);

    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const parsed = Papa.parse<Problem>(fileContent, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim(), // Ensure headers are clean
        });

        return parsed.data;
    } catch (error) {
        console.error(`Error reading ${filename} for ${companyName}:`, error);
        return [];
    }
}
