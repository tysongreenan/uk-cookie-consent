# Blog AEO Optimization Guide

## Overview
This guide outlines the Answer Engine Optimization (AEO) structure for all blog posts. Following this structure helps AI models (like ChatGPT, Perplexity, etc.) understand and retrieve our content as direct answers to user queries.

## AEO Page Structure

### 1. Title Tag
**Format:** The query people look up in ChatGPT/Perplexity
- Use a clear, question-based title with your main keyword
- Should match natural language queries
- Example: "What Is Answer Engine Optimization" or "How to Add Cookie Banner to WordPress"

**Implementation:**
- Set in frontmatter: `title: "Your Question-Based Title"`
- This appears in SERPs and AI Overviews

---

### 2. Updated Date
**Format:** "Updated [Month] [Year]"
- Shows content freshness
- Helps with SEO and user trust
- Example: "Updated May 2025"

**Implementation:**
- Add to frontmatter: `updatedDate: "2025-05-01"`
- Display prominently below title

---

### 3. Main Question (H1)
**Format:** Phrase as a natural-language query
- Should be the primary question the post answers
- Helps AI understand and retrieve it as a direct answer
- Example: "What Is Cookie Consent in Canada?" or "How Do I Make My Cookie Banner Compliant?"

**Implementation:**
- Use as the main H1 heading
- Should be the first heading in the content
- Make it clear and question-based

---

### 4. Direct Answer Box
**Format:** Clear 1-3 sentence answer in simple language
- Give the answer immediately after the H1
- Format like a featured snippet
- Use simple, direct language
- Optional: Add a relevant internal link

**Implementation:**
```markdown
## [H1: Main Question]

**Direct Answer:** [1-3 sentences answering the question clearly and simply]

[Optional internal link to related content]
```

**Example:**
```markdown
## What Is Cookie Consent in Canada?

**Cookie consent in Canada** is the legal requirement for websites to obtain user permission before collecting personal data through cookies. Under Canadian privacy laws (PIPEDA, CASL, and Quebec's Law 25), websites must get explicit, opt-in consent for tracking cookies used for analytics, advertising, or marketing purposes.

[Learn more about PIPEDA compliance →](/compliance/pipeda)
```

---

### 5. Table of Contents
**Format:** Clear navigation with anchors
- Helps users and LLMs navigate the content
- Use clear anchors for each section or question
- Should be clickable/jumpable

**Implementation:**
- Generate automatically from H2/H3 headings
- Display after the direct answer box
- Use component: `<TableOfContents />`

---

### 6. Follow-up Questions (H2/H3s)
**Format:** Use H2/H3s phrased as natural questions
- Match how users search and how LLMs retrieve content
- Each section should answer a related question
- Support the main point with detailed answers

**Implementation:**
```markdown
## What Types of Cookies Require Consent?

[Answer to this question]

## How Do I Make My Cookie Banner Compliant?

[Answer to this question]

### Do I Need Consent for Google Analytics?

[Sub-question answer]
```

**Best Practices:**
- Use question format for headings
- Each H2/H3 should be a complete question
- Answer each question thoroughly
- Include internal links where relevant

---

### 7. Images/Data & Content
**Format:** Visual content with clear alt text
- Use diagrams, how-to visuals, or simple charts
- Add clear alt text (LLMs can read it to enhance comprehension)
- Include outbound links to trusted sources
- LLMs use outbound links to verify and expand on answers

**Implementation:**
```markdown
![Alt text describing the image clearly for AI comprehension](image-url)

[Content with outbound links to trusted sources like official documentation]
```

**Best Practices:**
- Alt text should be descriptive and keyword-rich
- Include outbound links to authoritative sources
- Use images to illustrate key concepts
- Charts/diagrams should be simple and clear

---

### 8. Call to Action
**Format:** Prompt users to take the next step
- Ask a question, download, or explore more
- Should be relevant to the content
- Clear and actionable

**Implementation:**
```markdown
## Ready to Implement?

[Clear CTA text with button/link]

- ✓ Benefit 1
- ✓ Benefit 2
- ✓ Benefit 3

[Button: Get Started / Learn More / Download]
```

---

### 9. Conclusion / TL;DR
**Format:** Recap key points in clear, skimmable format
- Use bullets or a short summary
- Highlight the most important takeaways
- Make it easy to scan

**Implementation:**
```markdown
## Conclusion / TL;DR

**Key Takeaways:**
- Point 1: [Brief explanation]
- Point 2: [Brief explanation]
- Point 3: [Brief explanation]

**Next Steps:**
1. Action item 1
2. Action item 2
3. Action item 3
```

---

### 10. Structured Signals
**Format:** Add schema, expert bio, and related questions
- Help LLMs interpret content and boost credibility
- Include FAQ schema markup
- Add author bio/expertise
- Include related questions section

**Implementation:**
- Add FAQ schema in frontmatter or component
- Include author card with expertise
- Add "Related Questions" section at the end
- Use structured data markup

---

## Complete AEO Template

```markdown
---
title: "What Is [Main Question]?"
description: "[Clear description answering the question]"
date: "2025-01-15"
updatedDate: "2025-05-01"
author: "Cookie Banner Team"
tags: ["Tag1", "Tag2", "Tag3"]
published: true
---

# [Main Question - Natural Language Query]

**Direct Answer:** [1-3 sentences answering the question clearly. Use simple language and format like a featured snippet.]

[Optional: Internal link to related content]

---

## Table of Contents

[Auto-generated from headings]

---

## [Follow-up Question 1 - H2]

[Detailed answer to this question]

### [Sub-question - H3]

[Answer to sub-question]

[Optional: Internal link]

---

## [Follow-up Question 2 - H2]

[Detailed answer]

![Descriptive alt text for AI comprehension](image-url)

[Content with outbound links to trusted sources]

---

## [Follow-up Question 3 - H2]

[Detailed answer with examples]

---

## Ready to [Action]?

[Clear call to action with benefits]

- ✓ Benefit 1
- ✓ Benefit 2
- ✓ Benefit 3

[CTA Button]

---

## Conclusion / TL;DR

**Key Takeaways:**
- **Point 1:** [Brief explanation]
- **Point 2:** [Brief explanation]
- **Point 3:** [Brief explanation]

**Next Steps:**
1. [Action item 1]
2. [Action item 2]
3. [Action item 3]

---

## Frequently Asked Questions

### [FAQ Question 1]

[Answer]

### [FAQ Question 2]

[Answer]

### [FAQ Question 3]

[Answer]
```

---

## Checklist for Each Blog Post

- [ ] Title is question-based and matches search queries
- [ ] Updated date is present and current
- [ ] H1 is phrased as a natural language question
- [ ] Direct answer box (1-3 sentences) appears immediately after H1
- [ ] Table of contents is present and functional
- [ ] All H2/H3 headings are phrased as questions
- [ ] Images have descriptive, keyword-rich alt text
- [ ] Outbound links to trusted sources are included
- [ ] Clear call to action is present
- [ ] Conclusion/TL;DR section recaps key points
- [ ] FAQ section with structured data
- [ ] Author bio/expertise is included
- [ ] Internal links to related content

---

## Notes

- **Language:** Keep answers simple and direct. Avoid jargon when possible.
- **Formatting:** Use clear headings, bullets, and short paragraphs.
- **Links:** Balance internal and outbound links. Outbound links should be to authoritative sources.
- **Images:** Every image should have meaningful alt text that describes the content for AI comprehension.
- **Questions:** Frame all major sections as questions that users might ask.

