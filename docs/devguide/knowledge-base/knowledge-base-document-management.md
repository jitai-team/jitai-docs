---
sidebar_position: 2
slug: knowledge-base-document-management
---

# Knowledge Base Document Management

Add and maintain AI knowledge base documents on the "Document Management" page:

![Add Document](./img/add-document-alt.png)

Click "+ Add File" to open the add file slide panel.

![Document Upload](./img/document-upload.png)

In the "Select Data Source" step-by-step guide page, click the dashed box to select documents or drag documents into the dashed box. After the upload is complete, click "Next".

:::tip
Document formats support PDF, DOCX, TXT, MD, with individual document size not exceeding 10M.
:::

![Segment Cleaning](./img/segment-cleaning.png)

After entering the "Segmentation and Cleaning" step, configure "Segment Identifier", "Maximum Segment Length", "Segment Overlap Length", and "Cleaning Settings" in sequence according to the actual situation of the uploaded documents. After configuration is complete, click "Next". For parameter descriptions, refer to [Vectorization Configuration Description](#vectorization-configuration-description).

![Vectorization](./img/vectorization.png)

After entering the "Process and Complete" step, the system will process each document in the background. You can wait for all documents to complete vectorization, or click "Return to Document List" to directly close the slide panel (this does not affect the background processing flow).

![File List](./img/file-list.png)

Click the refresh button in the document list to view the current document vectorization status.


## AI Knowledge Base Settings {#ai-knowledge-base-settings}
Configuration items in "Knowledge Base Settings" will affect search result accuracy and the size of final returned content.

![Knowledge Base Settings](./img/knowledge-base-settings.png)

Settings for "Vector Database" and "Vector Model" are not allowed to be modified. Developers can dynamically adjust parameters such as "Reranking Model", "TopK", "TopN", "Vector Similarity Threshold", and "Reranking Score Threshold" based on feedback from [Query Testing](#query-testing).

:::tip
To improve accuracy, you need to first understand [How Settings Participate in Query Flow](./full-text-and-semantic-search#how-ai-knowledge-base-settings-participate-in-query-flow). Additionally, after modifying configuration items, you need to click save for them to take effect in [Query Testing](#query-testing).
:::

## Query Testing {#query-testing}
To facilitate debugging the effectiveness of AI knowledge bases, a query testing function is provided.

![Query Testing](./img/query-test.png)

After entering a question and clicking "Test Query", the system will understand the query semantics and return results, while displaying the number of documents that meet the conditions, vector similarity scores, and reranking scores for each document. Based on this, you can continuously adjust [Knowledge Base Settings](#ai-knowledge-base-settings) to improve retrieval effectiveness.

## Vectorization Configuration Description {#vectorization-configuration-description}
- Segment Identifier: Separators used to split documents, multiple can be selected. The system segments according to all selected separators, defaulting to paragraph separator (`\\n\\n`).
- Maximum Segment Length: Maximum number of characters per text chunk, recommended 500–2000. Smaller chunks are more precise but may lose context; larger chunks retain more context but may be less precise.
- Segment Overlap Length: Number of overlapping characters between adjacent text chunks, recommended to be 10%–20% of chunk size.
- Enable Segment Cleaning: Cleaning functions to improve text quality and retrieval precision, such as whitespace cleanup, full-width to half-width conversion, line break repair, etc.

## Knowledge Base Configuration Parameter Description {#knowledge-base-configuration-parameter-description}
| Parameter Name | Default Value | Recommended Range | Description |
|---------|--------|----------|------|
| Vector Model | - | - | Determines semantic understanding capability of documents and queries, cannot be modified after creation |
| Reranking Model | - | - | Performs fine sorting of recalled results, can be changed anytime to optimize effectiveness |
| TopK | 50 | 1-100 | Vector recall count, controls the number of documents in preliminary retrieval |
| TopN | 5 | 1-10 | Post-reranking return count, final number of documents returned to users |
| Vector Similarity Threshold (vectorScore) | 0.6 | 0.1-1.0 | Filters recall results, higher values require stricter matching |
| Reranking Score Threshold (reRankScore) | 0.3 | 0.1-1.0 | Filters reranking results, higher values require more precision |

:::tip Parameter Recommendations
Generally recommend first increasing TopK (expanding recall coverage), then using appropriate reRankScore for fine filtering. If recall noise is excessive, vectorScore can be appropriately increased.
:::

