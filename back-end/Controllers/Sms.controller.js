import Template from "../Models/Template.model.js";
import fs from "fs";

// Mock sendSMS function - replace with your actual implementation
const sendSMS = async (phone, message) => {
  console.log(`Sending SMS to ${phone}: ${message}`);

  //logs into a txt file
  fs.appendFileSync("smsLogs.txt", `Sending SMS to ${phone}: ${message}\n`);

  // Implement actual SMS sending logic here
  return { success: true, phone, message };
};

const SendSMS = async (req, res) => {
  try {
    const smsPayload = req.body;
    const { templateId, users } = smsPayload;

    // Fetch the template by ID
    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    // Extract variables from the template (types: username, date, time)
    const templateVariables = template.variables;

    // Process each user's SMS by replacing placeholders based on variable types
    const smsResponses = await Promise.all(
      users.map(async (user) => {
        const { name, phoneNumber } = user;

        // Map the variable types to actual values
        const variables = {
          username: name,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        };

        // Replace variables based on their types
        const personalizedMessage = replaceTemplateVariablesByType(
          template.Content,
          templateVariables,
          variables
        );

        /// Save the SMS history
        try {
          const history = new HistoryModel({
            name,
            phoneNumber,
            TemplateId: templateId, // Make sure this is correctly defined
          });

          await history.save();
        } catch (historyError) {
          console.error("Error saving history:", historyError);
        }

        // Send SMS to user
        const response = await sendSMS(phoneNumber, personalizedMessage);
        return response;
      })
    );

    // Send response back with the results
    res.status(200).json({
      message: "SMS sent successfully",
      results: smsResponses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * Replaces only the variables with types `username`, `date`, and `time` in the template content.
 * Also handles "predefined" type with a value that maps to the valid types.
 *
 * @param {String} templateContent - The template content with placeholders like {{variableName}}.
 * @param {Array} templateVariables - The array of template variables with their types.
 * @param {Object} values - The object containing values for types (e.g., { username: 'John', date: '2024-09-10', time: '11:00 AM' }).
 * @returns {String} - The processed message with variables replaced.
 */
const replaceTemplateVariablesByType = (
  templateContent,
  templateVariables,
  values
) => {
  let processedContent = templateContent;

  templateVariables.forEach((variable) => {
    let replacementValue;

    // Handle predefined type that maps to a specific valid type
    if (variable.type === "predefined") {
      replacementValue = values[variable.value]; // Map the 'predefined' variable to the actual type like 'username'
    } else if (["username", "date", "time"].includes(variable.type)) {
      replacementValue = values[variable.type]; // Direct mapping for 'username', 'date', 'time'
    }

    if (replacementValue) {
      const variablePattern = new RegExp(`{{${variable.name}}}`, "g");
      processedContent = processedContent.replace(
        variablePattern,
        replacementValue
      );
    }
  });

  return processedContent;
};

export { SendSMS };
