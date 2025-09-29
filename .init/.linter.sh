#!/bin/bash
cd /home/kavia/workspace/code-generation/data-explorer-145084-145104/nextjs_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

