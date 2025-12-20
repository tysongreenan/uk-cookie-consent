#!/bin/bash

# Script to migrate Lucide React icons to Phosphor Icons
# This performs basic import statement replacements

echo "Starting icon migration from Lucide to Phosphor..."

# Find all files with lucide-react imports (excluding node_modules)
files=$(grep -rl "from 'lucide-react'" components/ --exclude-dir=node_modules)

for file in $files; do
  echo "Processing: $file"

  # Replace the import statement
  sed -i '' "s/from 'lucide-react'/from '@phosphor-icons\/react'/" "$file"

  # Common icon name replacements (add more as needed)
  sed -i '' 's/ChevronDown/CaretDown/g' "$file"
  sed -i '' 's/ChevronRight/CaretRight/g' "$file"
  sed -i '' 's/ChevronLeft/CaretLeft/g' "$file"
  sed -i '' 's/ChevronUp/CaretUp/g' "$file"
  sed -i '' 's/EyeOff/EyeSlash/g' "$file"
  sed -i '' 's/\bEdit\b/PencilSimple as Edit/g' "$file"
  sed -i '' 's/MoreHorizontal/DotsThree as MoreHorizontal/g' "$file"
  sed -i '' 's/MoreVertical/DotsThreeVertical as MoreVertical/g' "$file"
  sed -i '' 's/Trash2/Trash as Trash2/g' "$file"
  sed -i '' 's/LogOut/SignOut as LogOut/g' "$file"
  sed -i '' 's/LogIn/SignIn as LogIn/g' "$file"
  sed -i '' 's/Settings/Gear as Settings/g' "$file"
  sed -i '' 's/HelpCircle/Question as HelpCircle/g' "$file"
  sed -i '' 's/Search/MagnifyingGlass as Search/g' "$file"
  sed -i '' 's/Filter/Funnel as Filter/g' "$file"
  sed -i '' 's/\bZap\b/Lightning as Zap/g' "$file"
  sed -i '' 's/Sparkles/Sparkle as Sparkles/g' "$file"
  sed -i '' 's/Mail/EnvelopeSimple as Mail/g' "$file"
  sed -i '' 's/MessageCircle/ChatCircle as MessageCircle/g' "$file"
  sed -i '' 's/ExternalLink/ArrowSquareOut as ExternalLink/g' "$file"
  sed -i '' 's/LayoutDashboard/Squares as LayoutDashboard/g' "$file"
  sed -i '' 's/BarChart3/ChartBar as BarChart3/g' "$file"
  sed -i '' 's/Menu/List as Menu/g' "$file"
done

echo "Icon migration complete!"
echo "Note: Some icons may need manual adjustment for proper mapping."
