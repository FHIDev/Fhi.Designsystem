---
name: 'fhi-designsystem'
description: 'A simple skill to get information about the FHI Design System.'
---

# FHI Design System

Use this skill when the user wants to get information about the FHI Design System, including its components, guidelines, and best practices for design and development.

Any html element with the prefix "fhi-" in the tagname is a component of the FHI Design System. For example, <fhi-button> is a button component from the FHI Design System. You can use this skill to provide information about specific components, their usage, and how to implement them in design and development projects.

In the npm package @folkehelseinstituttet/designsystem you can find the file custom-element.json. This file is a custom element manifest that contains metadata about the custom elements (web components) in the FHI Design System. It includes information about the components, such as their tag names, attributes, properties, methods, and slots. This file can be used to understand the structure and functionality of the components in the FHI Design System.

The source code can be found at this GitHub repository: https://github.com/FHIDev/Fhi.Designsystem/tree/main/packages/fhi-designsystem/src/components. Use this repository to explore the source code of the components, understand their structure, and see how they are implemented. This can help you gain a deeper understanding of the FHI Design System and how to use its components effectively in your projects.

Documentation for the FHI Design System can be found at https://designsystem.fhi.no. This page is a Storybook instance that contains all the components and guidelines for the FHI Design System. You can refer to this documentation to get detailed information about each component, including its attributes, properties, methods, slots and examples of usage.

## Workflow

IMPORTANT: If the user is asking about a specific component, always check the manifest first to find relevant information about the component. If you cant find the information needed in the manifest or the user is asking about a more general topic, you should check the documentation page and finally the source code if needed.

IMPORTANT: Always provide a link to the documentation.

Use this workflow when the user enters a query related the FHI designsystem or any component with the prefix "fhi-" in the tagname.
Provide a concise and accurate answer based on the information found in the manifest, source code and/or documentation, including any relevant details about the components, guidelines, and best practices for design and development.
If necessary, provide examples of usage to help the user understand how to implement the components in their projects.
