/**
 * Information Technology Project Management (ITPM) Module for Sentix Enterprise
 * Handles:
 * 1. Earned Value Management (EVM) Metrics & Indicators (CV, SV, CPI, SPI, EAC in INR ₹)
 * 2. Gantt Chart & WBS Task Scheduling
 * 3. Agile / Kanban Board Status Updates
 * 4. 5x5 Risk Matrix & Mitigation Register
 */

class ITPMManager {
    constructor(evmMetrics, ganttTasks, risks) {
        this.evm = { ...evmMetrics };
        this.tasks = ganttTasks;
        this.risks = risks;
    }

    /**
     * Helper to format numbers in Indian Rupee format (en-IN)
     */
    static formatINR(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    /**
     * Computes Earned Value Management Indicators
     */
    calculateEVM() {
        const { budgetAtCompletion, plannedValue, earnedValue, actualCost } = this.evm;
        
        const costVariance = earnedValue - actualCost;          // CV = EV - AC
        const scheduleVariance = earnedValue - plannedValue;    // SV = EV - PV
        
        const cpi = actualCost > 0 ? (earnedValue / actualCost) : 1.0;     // CPI = EV / AC
        const spi = plannedValue > 0 ? (earnedValue / plannedValue) : 1.0; // SPI = EV / PV

        // Estimate at Completion (EAC) = BAC / CPI
        const eac = cpi > 0 ? budgetAtCompletion / cpi : budgetAtCompletion;
        const varianceAtCompletion = budgetAtCompletion - eac; // VAC = BAC - EAC

        return {
            bac: budgetAtCompletion,
            pv: plannedValue,
            ev: earnedValue,
            ac: actualCost,
            cv: parseFloat(costVariance.toFixed(2)),
            sv: parseFloat(scheduleVariance.toFixed(2)),
            cpi: parseFloat(cpi.toFixed(2)),
            spi: parseFloat(spi.toFixed(2)),
            eac: parseFloat(eac.toFixed(2)),
            vac: parseFloat(varianceAtCompletion.toFixed(2)),
            formattedCV: ITPMManager.formatINR(costVariance),
            formattedSV: ITPMManager.formatINR(scheduleVariance),
            formattedEAC: ITPMManager.formatINR(eac),
            costStatus: cpi >= 1.0 ? "Under Budget (Good)" : "Over Budget (Warning)",
            scheduleStatus: spi >= 1.0 ? "Ahead of Schedule (Good)" : "Behind Schedule (Delay)"
        };
    }

    /**
     * Updates EVM metric values dynamically
     */
    updateEVMMetric(key, val) {
        if (this.evm.hasOwnProperty(key)) {
            this.evm[key] = parseFloat(val) || 0;
        }
        return this.calculateEVM();
    }

    /**
     * Return Risk Rating category based on 5x5 Matrix (Probability x Impact)
     */
    getRiskRating(score) {
        if (score >= 15) return { category: "Critical", color: "var(--danger-color)" };
        if (score >= 10) return { category: "High", color: "var(--warning-color)" };
        if (score >= 5) return { category: "Medium", color: "var(--info-color)" };
        return { category: "Low", color: "var(--success-color)" };
    }
}
