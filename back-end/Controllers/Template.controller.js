import Template from "../Models/Template.model.js";
import asyncHandler from "express-async-handler";
import { z } from "zod";

/**
 * @desc    Get all templates of a type
 * @route   GET /api/templates
 * @access  Private
 */

const getTemplates = asyncHandler(async (req, res) => {
  try {
    const { type } = req.params;
    const templates = await Template.find({ type });

    if (templates) {
      return res.status(200).json({
        success: true,
        data: templates,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No templates found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @desc    Create a new template
 * @route   POST /api/templates
 * @access  Private
 */

const createTemplate = asyncHandler(async (req, res) => {
  try {
    const { name, body, subject, variables } = req.body;

    const template = await Template.create({
      Subject: name,
      Content: body,
      type: "sms",
      templateId: subject,
      variables,
    });
    if (template) {
      return res.status(201).json({
        success: true,
        data: template,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid template data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @desc    delete a template
 * @route   PUT /api/templates/:id
 * @access  Private
 */

const deleteTemplate = asyncHandler(async (req, res) => {
  try {
    const templateId = req.params.id;
    const template = await Template.findOneAndDelete({ templateId });

    if (template) {
      return res.status(200).json({
        success: true,
        message: "Template deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
const updateTemplate = asyncHandler(async (req, res) => {
  try {
    const templateId = req.params.id;
    const { content } = req.body;

    console.log("Template ID:", templateId);
    console.log("Request Body:", req.body);

    // Find and update the template by its _id
    const template = await Template.findByIdAndUpdate(
      templateId,
      {
        Content: content,
      },
      { new: true }
    );

    if (template) {
      return res.status(200).json({
        success: true,
        message: "Template updated successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export { getTemplates, createTemplate, deleteTemplate, updateTemplate };
