/**
 * Forbids blank lines immediately after the opening tag or immediately before
 * the closing tag in Vue SFC <script>, <template>, and <style> blocks.
 *
 *   <script setup lang="ts">  ← no blank line allowed right after
 *                             ← this is forbidden
 *     const x = 1;
 *                             ← this is forbidden
 *   </script>
 */

function checkRange(context, node, startOffset, endOffset) {
  const { sourceCode } = context;
  const inner = sourceCode.text.slice(startOffset, endOffset);

  const leadingBlankPattern = /^(\r?\n)(\s*\r?\n)+/;
  const leadingMatch = leadingBlankPattern.exec(inner);
  if (leadingMatch) {
    const fullMatchLength = leadingMatch[0].length;
    const replacement = leadingMatch[1];
    context.report({
      node,
      messageId: "noBlankAfterOpeningTag",
      fix(fixer) {
        return fixer.replaceTextRange(
          [startOffset, startOffset + fullMatchLength],
          replacement
        );
      }
    });
  }

  const trailingBlankPattern = /(\r?\n)(\s*\r?\n)+(\s*)$/;
  const trailingMatch = trailingBlankPattern.exec(inner);
  if (trailingMatch) {
    const fullMatchLength = trailingMatch[0].length;
    const replacement = `${trailingMatch[1]}${trailingMatch[3]}`;
    context.report({
      node,
      messageId: "noBlankBeforeClosingTag",
      fix(fixer) {
        return fixer.replaceTextRange(
          [endOffset - fullMatchLength, endOffset],
          replacement
        );
      }
    });
  }
}

function checkVueElement(context, node) {
  if (!node.startTag || !node.endTag) {
    return;
  }

  checkRange(context, node, node.startTag.range[1], node.endTag.range[0]);
}

/** @type {import("eslint").Rule.RuleModule} */
export default {
  meta: {
    type: "layout",
    fixable: "whitespace",
    schema: [],
    messages: {
      noBlankAfterOpeningTag: "Remove the blank line after the opening tag.",
      noBlankBeforeClosingTag: "Remove the blank line before the closing tag."
    }
  },
  create(context) {
    function handle(node) {
      checkVueElement(context, node);
    }

    return {
      "VElement[name='template']": handle,
      "VElement[name='script']": handle,
      "VElement[name='style']": handle
    };
  }
};
