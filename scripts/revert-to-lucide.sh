#!/bin/bash

echo "Reverting icon imports from Phosphor back to Lucide..."

# Find all files with Phosphor imports
files=$(find components/ -name "*.tsx" -type f)

for file in $files; do
  # Replace the import statement
  sed -i '' "s/from '@phosphor-icons\/react'/from 'lucide-react'/g" "$file"

  # Revert common icon name changes
  sed -i '' 's/CaretDown/ChevronDown/g' "$file"
  sed -i '' 's/CaretRight/ChevronRight/g' "$file"
  sed -i '' 's/CaretLeft/ChevronLeft/g' "$file"
  sed -i '' 's/CaretUp/ChevronUp/g' "$file"
  sed -i '' 's/EyeSlash/EyeOff/g' "$file"
  sed -i '' 's/PencilSimple as Edit/Edit/g' "$file"
  sed -i '' 's/DotsThree as MoreHorizontal/MoreHorizontal/g' "$file"
  sed -i '' 's/DotsThreeVertical as MoreVertical/MoreVertical/g' "$file"
  sed -i '' 's/Trash as Trash2/Trash2/g' "$file"
  sed -i '' 's/SignOut as LogOut/LogOut/g' "$file"
  sed -i '' 's/SignIn as LogIn/LogIn/g' "$file"
  sed -i '' 's/Gear as Settings/Settings/g' "$file"
  sed -i '' 's/Question as HelpCircle/HelpCircle/g' "$file"
  sed -i '' 's/MagnifyingGlass as Search/Search/g' "$file"
  sed -i '' 's/Funnel as Filter/Filter/g' "$file"
  sed -i '' 's/Lightning as Zap/Zap/g' "$file"
  sed -i '' 's/Sparkle as Sparkles/Sparkles/g' "$file"
  sed -i '' 's/Envelope as Mail/Mail/g' "$file"
  sed -i '' 's/ChatCircle as MessageCircle/MessageCircle/g' "$file"
  sed -i '' 's/ArrowSquareOut as ExternalLink/ExternalLink/g' "$file"
  sed -i '' 's/GridFour as LayoutDashboard/LayoutDashboard/g' "$file"
  sed -i '' 's/ChartBar as BarChart3/BarChart3/g' "$file"
  sed -i '' 's/List as Menu/Menu/g' "$file"
  sed -i '' 's/CircleNotch as Loader2/Loader2/g' "$file"
  sed -i '' 's/Translate as Languages/Languages/g' "$file"
  sed -i '' 's/MapPin as Map/Map/g' "$file"
  sed -i '' 's/CurrencyDollar as DollarSign/DollarSign/g' "$file"
  sed -i '' 's/WarningCircle as AlertTriangle/AlertTriangle/g' "$file"
  sed -i '' 's/TrendUp as TrendingUp/TrendingUp/g' "$file"
  sed -i '' 's/ArrowsClockwise as RefreshCw/RefreshCw/g' "$file"
  sed -i '' 's/House as Home/Home/g' "$file"
  sed -i '' 's/Buildings as Building2/Building2/g' "$file"
  sed -i '' 's/PaperPlaneTilt as Send/Send/g' "$file"
  sed -i '' 's/\bGear\b/Settings/g' "$file"
  sed -i '' 's/\bSparkle\b/Sparkles/g' "$file"
  sed -i '' 's/\bWarningCircle\b/AlertTriangle/g' "$file"
  sed -i '' 's/\bLightning\b/Zap/g' "$file"
done

echo "Reverted all icon imports back to Lucide React!"
