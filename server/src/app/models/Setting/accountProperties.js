const accountProperties = {
    account: {
        language: {
            type: String,
            default: "en",
        },
        timezone: {
            type: String,
            default: "UTC",
        },
        zip_code: {
            type: Number,
        },
        security: {
            two_factor_auth: {
                type: Boolean,
                default: false,
            },
            login_alerts: {
                type: Boolean,
                default: false,
            }
        }
    }
}

module.exports = accountProperties