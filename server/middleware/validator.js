const validateDrug = (req, res, next) => {
    const { name, dosage, card, pack, perDay } = req.body;

    // Validate name length (more than 5 characters)
    if (!name || name.length <= 5) {
        return res.status(400).send({
            message: "Drug name must be longer than 5 characters"
        });
    }

    // Validate dosage format (XX-morning,XX-afternoon,XX-night)
    const dosagePattern = /^\d{1,2}-morning,\d{1,2}-afternoon,\d{1,2}-night$/;
    if (!dosage || !dosagePattern.test(dosage)) {
        return res.status(400).send({
            message: "Dosage must follow the format: XX-morning,XX-afternoon,XX-night where XX are digits"
        });
    }

    // Validate card value (more than 1000)
    if (!card || parseInt(card) <= 1000) {
        return res.status(400).send({
            message: "Card must be more than 1000"
        });
    }

    // Validate pack value (more than 0)
    if (!pack || parseInt(pack) <= 0) {
        return res.status(400).send({
            message: "Pack must be more than 0"
        });
    }

    // Validate perDay value (more than 0 and less than 90)
    if (!perDay || parseInt(perDay) <= 0 || parseInt(perDay) >= 90) {
        return res.status(400).send({
            message: "PerDay must be more than 0 and less than 90"
        });
    }

    next();
};

module.exports = validateDrug;
