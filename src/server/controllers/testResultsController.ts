export class TestResultsController {
    // Method to fetch all test results
    public async getAllTestResults(req, res) {
        try {
            // Logic to retrieve test results from the database
            const testResults = await TestResult.find();
            res.status(200).json(testResults);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching test results', error });
        }
    }

    // Method to fetch a specific test result by ID
    public async getTestResultById(req, res) {
        const { id } = req.params;
        try {
            const testResult = await TestResult.findById(id);
            if (!testResult) {
                return res.status(404).json({ message: 'Test result not found' });
            }
            res.status(200).json(testResult);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching test result', error });
        }
    }

    // Method to create a new test result
    public async createTestResult(req, res) {
        const newTestResult = new TestResult(req.body);
        try {
            const savedTestResult = await newTestResult.save();
            res.status(201).json(savedTestResult);
        } catch (error) {
            res.status(400).json({ message: 'Error creating test result', error });
        }
    }

    // Method to update an existing test result
    public async updateTestResult(req, res) {
        const { id } = req.params;
        try {
            const updatedTestResult = await TestResult.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedTestResult) {
                return res.status(404).json({ message: 'Test result not found' });
            }
            res.status(200).json(updatedTestResult);
        } catch (error) {
            res.status(400).json({ message: 'Error updating test result', error });
        }
    }

    // Method to delete a test result
    public async deleteTestResult(req, res) {
        const { id } = req.params;
        try {
            const deletedTestResult = await TestResult.findByIdAndDelete(id);
            if (!deletedTestResult) {
                return res.status(404).json({ message: 'Test result not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting test result', error });
        }
    }
}