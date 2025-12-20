/**
 * Icon mapping from Lucide React to Phosphor Icons
 *
 * This file provides a centralized mapping to ease the migration
 * from Lucide to Phosphor icons throughout the application.
 *
 * Usage:
 * import { Check, X } from '@/lib/icon-map'
 */

export {
  // Common UI icons
  Check,
  X,
  CaretDown as ChevronDown,
  CaretRight as ChevronRight,
  CaretLeft as ChevronLeft,
  CaretUp as ChevronUp,
  Plus,
  Minus,

  // Navigation
  List as Menu,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,

  // User & Account
  User,
  Users,
  SignOut as LogOut,
  SignIn as LogIn,
  UserCircle,

  // Actions
  Eye,
  EyeSlash as EyeOff,
  Copy,
  Download,
  Upload,
  Share,
  Trash,
  PencilSimple as Edit,
  FloppyDisk as Save,

  // Status & Feedback
  CheckCircle,
  XCircle,
  Warning,
  WarningCircle,
  Info,
  Question as HelpCircle,

  // Media
  Image,
  File,
  FileText,
  Folder,

  // Communication
  EnvelopeSimple as Mail,
  Bell,
  ChatCircle as MessageCircle,

  // Time
  Clock,
  Calendar,

  // Settings
  Gear as Settings,
  GearSix as SettingsSix,
  DotsThree as MoreHorizontal,
  DotsThreeVertical as MoreVertical,

  // Search & Filter
  MagnifyingGlass as Search,
  Funnel as Filter,

  // Special
  Lightning as Zap,
  Sparkle as Sparkles,
  Star,
  Heart,
  Flag,
  MapPin,
  Link,
  LinkBreak as Unlink,

  // Layout
  Rows,
  Columns,
  GridFour as Grid,
  SquaresFour as Grid2x2,

  // Tech
  Code,
  Terminal,
  Database,
  Globe,
  Shield,
  ShieldCheck,
  Lock,
  LockOpen,

  // Document
  ClipboardText as Clipboard,
  ListBullets as List,
  Article,

  // Social
  GithubLogo as Github,
  TwitterLogo as Twitter,
  LinkedinLogo as Linkedin,

  // Misc
  Spinner,
  CircleNotch as Loader,
  PlayCircle as Play,
  PauseCircle as Pause,
  Package,
  CreditCard,
} from '@phosphor-icons/react'
