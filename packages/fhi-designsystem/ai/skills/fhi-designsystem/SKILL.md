---
name: 'fhi-designsystem'
description: 'A simple skill to get information about the FHI Design System.'
---

# FHI Design System

FHI Design System is a collection of reusable web-components, guidelines, and best practices for design and development. It provides a consistent and cohesive design language that can be used across different projects and platforms.

FHI Designsystem also includes design tokens, which are a set of css properties that define the visual properties of the components, such as colors, typography, spacing, etc. Design tokens ensure consistency and maintainability in design and development.

Use this skill when the user wants to get information about the FHI Design System, including its components, design tokens, guidelines, and best practices for design and development.

Any html element with the prefix "fhi-" in the tagname is a component of the FHI Design System. For example, <fhi-button> is a button component from the FHI Design System. You can use this skill to provide information about specific components, their usage, and how to implement them in design and development projects.

In the npm package @folkehelseinstituttet/designsystem you can find custom element manifests. These files contain useful information about the components, such as their tag names, attributes, properties, methods, and slots. custom-elements.json contains metadata for all the components, while individual manifest files (e.g., fhi-button.manifest.json) contain metadata for their respective components. You can refer to these manifest files to get detailed information about the components and how to use them effectively.

The source code can be found at this GitHub repository: https://github.com/FHIDev/Fhi.Designsystem/tree/main/packages/fhi-designsystem/src/components. Use this repository to explore the source code of the components, understand their structure, and see how they are implemented. This can help you gain a deeper understanding of the FHI Design System and how to use its components and design tokens effectively in your projects.

User friendly documentation for the FHI Design System can be found at https://designsystem.fhi.no. This page is a Storybook instance that contains all the components, design tokens and guidelines for the FHI Design System. You should refer to this documentation to get detailed information about each component, including its attributes, properties, methods, slots and examples of usage.

## Workflow

IMPORTANT: If the user is asking about a specific component, check the appropriate manifest first to find information about the component. Prefer using the component manifest. If you can't find the information needed in the manifests or the user is asking about a more general topic, you should check the documentation page and finally the source code if needed.

IMPORTANT: Always provide a link to the documentation if relevant.

IMPORTANT: Always use the design tokens when providing examples of usage for the components. Prioritize using semantic tokens over primitive tokens.

Provide a concise and accurate answer based on the information found in the manifest, documentation, and source code, including any relevant details about the components, guidelines, and best practices for design and development.

Provide examples of usage to help the user understand how to implement the components in their projects.
