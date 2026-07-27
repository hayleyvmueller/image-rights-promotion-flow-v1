import { useState, useLayoutEffect, useEffect, useRef } from 'react'
import {
  SideNavigation,
  SideNavigationItem,
  SideNavigationGroup,
  Table,
  Tag,
  Button,
  Link,
  Search,
  Pagination,
  ContentSwitch,
  Breadcrumbs,
  Tabs,
  Modal,
  Toast,
  Toggle,
  Checkbox,
  InlineMessage,
  Menu,
  ListBox,
  Avatar,
  EmptyPlaceholder,
} from '@rdc-npm/rdc-ui-v4'
import {
  IconHome,
  IconUsers,
  IconContact,
  IconListingStatus,
  IconNotifications,
  IconZap,
  IconFilter,
  IconSort,
  IconSparklesSm,
  IconRealAssist,
  IconMagicWand,
  IconUpload,
  IconMoreFilled,
  IconEdit,
  IconDelete,
  IconCalendar,
  IconBarChart,
  IconOpen,
  IconGridView,
  IconBuildingOverview,
  IconAgent,
  IconArrowLeft,
  IconCamera,
  IconChevronDown,
  IconChevronUp,
  IconClipboard,
  IconLink,
  IconPlay,
  IconOpenHouse,
  IconPhotos,
  IconClose,
  IconInfo,
  IconProfile,
  IconRefreshCw,
  LogoRealtorProDefault,
  LogoBrandWhite,
  LogoBrand,
} from '@rdc-npm/rdc-ui-v4/illustrations'
import { css } from 'styled-system/css'
import { hstack, vstack } from 'styled-system/patterns'

// ─── Sample data ──────────────────────────────────────────────────────────────

type Performance = 'Above average' | 'Below average' | 'Average'
type CompletenessColor = 'green' | 'yellow' | 'red'

interface Listing {
  id: string
  photo: string
  address1: string
  address2: string
  price: string
  agent: string
  email: string
  phone: string
  listDate: string
  daysAgo: string
  performance: Performance
  completeness: number
  completenessColor: CompletenessColor
  promotionStatus: string
  promoted?: boolean
  mediaEnhanced?: boolean
  uploadedPhotos: string[]
  buyers: string
}

const LISTINGS: Listing[] = [
  {
    id: '1',
    photo: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=160&h=120&fit=crop',
    address1: '456 Maple Drive',
    address2: 'Dallas, TX 75201',
    price: '$2,450,000',
    agent: 'Bobby Martinez',
    email: 'bmartinez@realtor.com',
    phone: '(214) 555-0142',
    listDate: '02/02/25',
    daysAgo: '3 days ago',
    performance: 'Above average',
    completeness: 90,
    completenessColor: 'green',
    promotionStatus: 'never promoted',
    uploadedPhotos: [],
    buyers: '3 matches',
  },
  {
    id: '2',
    photo: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=160&h=120&fit=crop',
    address1: '5678 Broadway Ln',
    address2: 'Austin, TX 78730',
    price: '$1,200,000',
    agent: 'Sophia Wang',
    email: 'swang@realtor.com',
    phone: '(512) 555-0187',
    listDate: '01/18/25',
    daysAgo: '17 days ago',
    performance: 'Below average',
    completeness: 30,
    completenessColor: 'red',
    promotionStatus: 'ended 07/25/26',
    uploadedPhotos: [],
    buyers: '11 matches',
  },
  {
    id: '3',
    photo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=160&h=120&fit=crop',
    address1: '12345 Sunnyhill Way',
    address2: 'Austin, TX 78730',
    price: '$1,595,000',
    agent: 'William LaClare',
    email: 'wlaclare@realtor.com',
    phone: '(512) 555-0163',
    listDate: '01/18/25',
    daysAgo: '17 days ago',
    performance: 'Average',
    completeness: 50,
    completenessColor: 'yellow',
    promotionStatus: 'ended 07/25/26',
    uploadedPhotos: [],
    buyers: '32 matches',
  },
  {
    id: '4',
    photo: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=160&h=120&fit=crop',
    address1: '456 Oak Avenue',
    address2: 'Austin, TX 78730',
    price: '$1,595,000',
    agent: 'Jose Carlos Zambrano',
    email: 'jzambrano@realtor.com',
    phone: '(512) 555-0119',
    listDate: '01/16/25',
    daysAgo: '19 days ago',
    performance: 'Above average',
    completeness: 92,
    completenessColor: 'green',
    promotionStatus: 'ended 07/25/26',
    uploadedPhotos: [],
    buyers: '3 matches',
  },
  {
    id: '5',
    photo: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=160&h=120&fit=crop',
    address1: '1001 Northwest Way',
    address2: 'Austin, TX 78730',
    price: '$780,000',
    agent: 'Mary MacGregor',
    email: 'mmacgregor@realtor.com',
    phone: '(512) 555-0104',
    listDate: '01/08/25',
    daysAgo: '27 days ago',
    performance: 'Average',
    completeness: 72,
    completenessColor: 'green',
    promotionStatus: 'ended 07/25/26',
    uploadedPhotos: [],
    buyers: '17 matches',
  },
  {
    id: '6',
    photo: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=160&h=120&fit=crop',
    address1: '98765 Sawtelle Blvd',
    address2: 'Austin, TX 78730',
    price: '$925,000',
    agent: 'Derek Alvarez',
    email: 'dalvarez@realtor.com',
    phone: '(512) 555-0176',
    listDate: '01/08/25',
    daysAgo: '27 days ago',
    performance: 'Above average',
    completeness: 88,
    completenessColor: 'green',
    promotionStatus: 'Promoted',
    promoted: true,
    uploadedPhotos: [],
    buyers: '24 matches',
  },
  {
    id: '7',
    photo: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=160&h=120&fit=crop',
    address1: '210 Cedar Point Rd',
    address2: 'Dallas, TX 75204',
    price: '$640,000',
    agent: 'Priya Nair',
    email: 'pnair@realtor.com',
    phone: '(214) 555-0198',
    listDate: '01/05/25',
    daysAgo: '30 days ago',
    performance: 'Below average',
    completeness: 45,
    completenessColor: 'red',
    promotionStatus: 'never promoted',
    uploadedPhotos: [],
    buyers: '8 matches',
  },
  {
    id: '8',
    photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=160&h=120&fit=crop',
    address1: '7788 Lakeview Terrace',
    address2: 'Austin, TX 78732',
    price: '$1,150,000',
    agent: 'Kevin Brooks',
    email: 'kbrooks@realtor.com',
    phone: '(512) 555-0155',
    listDate: '12/29/24',
    daysAgo: '37 days ago',
    performance: 'Average',
    completeness: 64,
    completenessColor: 'yellow',
    promotionStatus: 'ended 06/14/26',
    uploadedPhotos: [],
    buyers: '19 matches',
  },
  {
    id: '9',
    photo: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=160&h=120&fit=crop',
    address1: '3402 Elmwood Court',
    address2: 'Dallas, TX 75209',
    price: '$2,100,000',
    agent: 'Angela Foster',
    email: 'afoster@realtor.com',
    phone: '(214) 555-0133',
    listDate: '12/22/24',
    daysAgo: '44 days ago',
    performance: 'Above average',
    completeness: 96,
    completenessColor: 'green',
    promotionStatus: 'Promoted',
    promoted: true,
    uploadedPhotos: [],
    buyers: '41 matches',
  },
  {
    id: '10',
    photo: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=160&h=120&fit=crop',
    address1: '556 Riverbend Dr',
    address2: 'Austin, TX 78746',
    price: '$540,000',
    agent: 'Marcus Lee',
    email: 'mlee@realtor.com',
    phone: '(512) 555-0121',
    listDate: '12/18/24',
    daysAgo: '48 days ago',
    performance: 'Average',
    completeness: 58,
    completenessColor: 'yellow',
    promotionStatus: 'never promoted',
    uploadedPhotos: [],
    buyers: '6 matches',
  },
]

// Performance badge → Tag color
const PERFORMANCE_COLOR: Record<Performance, 'greenSubtle' | 'redSubtle' | 'graySubtle'> = {
  'Above average': 'greenSubtle',
  'Below average': 'redSubtle',
  'Average': 'graySubtle',
}

const SEGMENTS = ['For sale', 'For rent', 'Sold', 'ListHub']

const AVAILABLE_PROMOTIONS = 18

function formatListedDate(mmddyy: string): string {
  const [mm, dd, yy] = mmddyy.split('/').map(Number)
  const date = new Date(2000 + yy, mm - 1, dd)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ─── Chrome dimensions ──────────────────────────────────────────────────────────

const HEADER_HEIGHT = '72px'
const SIDEBAR_WIDTH = '300px'

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = () => setMatches(mq.matches)
    handler()
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])
  return matches
}

// ─── Top bar ────────────────────────────────────────────────────────────────────

function HamburgerIcon() {
  return (
    <span className={vstack({ gap: '4px', w: '20px' })}>
      <span className={css({ w: '100%', h: '2px', bg: 'currentColor', borderRadius: '100' })} />
      <span className={css({ w: '100%', h: '2px', bg: 'currentColor', borderRadius: '100' })} />
      <span className={css({ w: '100%', h: '2px', bg: 'currentColor', borderRadius: '100' })} />
    </span>
  )
}

function TopBar({ onMenuClick }: { onMenuClick?: () => void } = {}) {
  return (
    <header
      className={css({
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        h: HEADER_HEIGHT,
        bg: 'bg.base',
        borderBottomWidth: '100',
        borderBottomStyle: 'solid',
        borderColor: 'border.base',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { base: '400', sm: '600' },
        gap: '400',
        zIndex: 'navbar.fixed',
      })}
    >
      <div className={hstack({ gap: '400', alignItems: 'center', minW: '0' })}>
        {onMenuClick && (
          <button
            type="button"
            aria-label="Open menu"
            onClick={onMenuClick}
            className={css({
              display: 'inline-flex',
              md: { display: 'none' },
              alignItems: 'center',
              justifyContent: 'center',
              w: '40px',
              h: '40px',
              flexShrink: 0,
              borderRadius: '200',
              cursor: 'pointer',
              color: 'text.base',
              _hoverSupported: { bg: 'bg.alternate' },
            })}
          >
            <HamburgerIcon />
          </button>
        )}
        <LogoRealtorProDefault
          className={css({
            display: 'block',
            flexShrink: 0,
            h: { base: '18px', sm: '24px' },
            w: { base: '145px', sm: '193px' },
          })}
        />
      </div>

      <div className={hstack({ gap: '400', alignItems: 'center', flexShrink: 0 })}>
        {/* Notification bell with red dot */}
        <button
          aria-label="Notifications"
          className={css({
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            w: '40px',
            h: '40px',
            borderRadius: '200',
            cursor: 'pointer',
            color: 'text.base',
            _hoverSupported: { bg: 'bg.alternate' },
          })}
        >
          <IconNotifications size={3} />
          <span
            className={css({
              position: 'absolute',
              top: '12px',
              right: '12px',
              w: '8px',
              h: '8px',
              borderRadius: '500',
              bg: 'status.error',
              borderWidth: '100',
              borderStyle: 'solid',
              borderColor: 'bg.base',
            })}
          />
        </button>

        {/* Dark rounded-square avatar with initials */}
        <div
          className={css({
            w: '40px',
            h: '40px',
            borderRadius: '200',
            bg: 'bg.inverse',
            color: 'text.inverse',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textStyle: 'bodySm',
            fontWeight: 'bold',
          })}
        >
          JL
        </div>
      </div>
    </header>
  )
}

// ─── Sidebar ────────────────────────────────────────────────────────────────────

type SidebarPage = 'dashboard' | 'all-listings' | 'spotlight-listings'

function SidebarNav({
  activePage,
  onNavigate,
}: {
  activePage: SidebarPage
  onNavigate: (page: SidebarPage) => void
}) {
  const [listingsOpen, setListingsOpen] = useState(true)

  return (
    <SideNavigation className={css({ py: '500' })}>
      <SideNavigationItem
        id="dashboard"
        topLevel
        startIcon={<IconHome size={3} />}
        linkText="Dashboard"
        active={activePage === 'dashboard'}
        onLinkClick={() => onNavigate('dashboard')}
      />

      <SideNavigationGroup
        id="team-group"
        show={false}
        itemProps={{
          id: 'team',
          topLevel: true,
          isParent: true,
          startIcon: <IconUsers size={3} />,
          linkText: 'Team',
          listId: 'team-group',
          show: false,
        }}
      >
        <SideNavigationItem id="team-members" linkText="Members" />
      </SideNavigationGroup>

      <SideNavigationGroup
        id="leads-group"
        show={false}
        itemProps={{
          id: 'leads',
          topLevel: true,
          isParent: true,
          startIcon: <IconContact size={3} />,
          linkText: 'Leads',
          listId: 'leads-group',
          show: false,
        }}
      >
        <SideNavigationItem id="leads-all" linkText="All leads" />
      </SideNavigationGroup>

      <SideNavigationGroup
        id="listings-group"
        show={listingsOpen}
        itemProps={{
          id: 'listings',
          topLevel: true,
          isParent: true,
          startIcon: <IconListingStatus size={3} />,
          linkText: 'Listings',
          listId: 'listings-group',
          show: listingsOpen,
          onArrowClick: () => setListingsOpen((o) => !o),
          onLinkClick: () => setListingsOpen((o) => !o),
        }}
      >
        <SideNavigationItem
          id="all-listings"
          linkText="All listings"
          active={activePage === 'all-listings'}
          onLinkClick={() => onNavigate('all-listings')}
        />
        <SideNavigationItem
          id="spotlight-listings"
          linkText="Spotlight listings"
          active={activePage === 'spotlight-listings'}
          onLinkClick={() => onNavigate('spotlight-listings')}
        />
      </SideNavigationGroup>
    </SideNavigation>
  )
}

function Sidebar({
  activePage,
  onNavigate,
}: {
  activePage: SidebarPage
  onNavigate: (page: SidebarPage) => void
}) {
  return (
    <aside
      className={css({
        display: 'none',
        md: { display: 'block' },
        position: 'fixed',
        top: HEADER_HEIGHT,
        left: '0',
        bottom: '0',
        w: SIDEBAR_WIDTH,
        bg: 'bg.alternate',
        borderRightWidth: '100',
        borderRightStyle: 'solid',
        borderColor: 'border.base',
        overflowY: 'auto',
        zIndex: 'navbar.default',
      })}
    >
      <SidebarNav activePage={activePage} onNavigate={onNavigate} />
    </aside>
  )
}

function MobileSidebarDrawer({
  open,
  onClose,
  activePage,
  onNavigate,
}: {
  open: boolean
  onClose: () => void
  activePage: SidebarPage
  onNavigate: (page: SidebarPage) => void
}) {
  return (
    <Modal open={open} onClose={onClose} layout="drawer" drawerPosition="left" size="sm">
      <Modal.Header title="Menu" />
      <Modal.Body noPadding>
        <SidebarNav
          activePage={activePage}
          onNavigate={(page) => {
            onNavigate(page)
            onClose()
          }}
        />
      </Modal.Body>
    </Modal>
  )
}

// ─── Reusable card ──────────────────────────────────────────────────────────────

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={css({
        bg: 'bg.base',
        borderWidth: '100',
        borderStyle: 'solid',
        borderColor: 'border.base',
        borderRadius: '300',
        overflow: 'hidden',
      })}
    >
      <div className={className}>{children}</div>
    </div>
  )
}

// ─── Completeness cell (dot + percent) ──────────────────────────────────────────

const DOT_VAR: Record<CompletenessColor, string> = {
  green: 'var(--colors-status-success)',
  yellow: 'var(--colors-status-warning)',
  red: 'var(--colors-status-error)',
}

function Completeness({ value, color }: { value: number; color: CompletenessColor }) {
  return (
    <span className={hstack({ gap: '200', alignItems: 'center' })}>
      <span
        className={css({ w: '8px', h: '8px', borderRadius: '500', flexShrink: 0 })}
        style={{ backgroundColor: DOT_VAR[color] }}
      />
      <span className={css({ textStyle: 'bodySm', color: 'text.base' })}>{value}%</span>
    </span>
  )
}

// ─── Sortable header cell ───────────────────────────────────────────────────────

function SortableHeader({ label }: { label: string }) {
  return (
    <span className={hstack({ gap: '200', alignItems: 'center' })}>
      <span>{label}</span>
      <span className={css({ color: 'text.alternate', display: 'inline-flex' })}>
        <IconSort size={2} />
      </span>
    </span>
  )
}

// ─── All listings screen ────────────────────────────────────────────────────────

function AllListingsScreen({
  listings,
  onSelectListing,
  onPromote,
  onOpenPromoteListings,
  onEnhance,
}: {
  listings: Listing[]
  onSelectListing: (id: string) => void
  onPromote: (listing: Listing) => void
  onOpenPromoteListings: () => void
  onEnhance: (listing: Listing) => void
}) {
  const [search, setSearch] = useState('')
  const [segment, setSegment] = useState('For sale')
  const [page, setPage] = useState(1)

  return (
    <div className={vstack({ alignItems: 'stretch', gap: '700' })}>
      {/* Page header */}
      <div
        className={hstack({
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '400',
        })}
      >
        <h1 className={css({ textStyle: 'headingLg', fontWeight: 'bold', color: 'text.base' })}>
          All listings
        </h1>
        <Button
          styleType="Primary"
          size="lg"
          startIcon={<IconZap size={3} />}
          onClick={onOpenPromoteListings}
        >
          Promote listings
        </Button>
      </div>

      {/* Available promotions banner */}
      <Card className={css({ px: '600', py: '500' })}>
        <span className={css({ textStyle: 'bodyMd', fontWeight: 'bold', color: 'text.base' })}>
          {AVAILABLE_PROMOTIONS} available promotions
        </span>
      </Card>

      {/* Listings table card */}
      <Card>
        {/* Title row */}
        <div className={css({ px: '600', pt: '500', pb: '400' })}>
          <div className={vstack({ alignItems: 'flex-start', gap: '0' })}>
            <span className={css({ textStyle: 'bodyMd', fontWeight: 'bold', color: 'text.base' })}>
              311 total listings
            </span>
            <span className={css({ textStyle: 'bodySm', color: 'text.alternate' })}>
              Data provided by MLS
            </span>
          </div>
        </div>

        {/* Filter row */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            sm: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
            gap: '400',
            px: { base: '400', sm: '600' },
            pb: '500',
          })}
        >
          <div className={hstack({ gap: '300', alignItems: 'center', flexWrap: 'wrap' })}>
            <div className={css({ w: { base: '100%', xs: '320px' } })}>
              <Search
                size="inline"
                placeholder="Search for a listing"
                value={search}
                sections={[]}
                onInputChange={(v) => setSearch(v)}
                onSearch={() => {}}
              />
            </div>
            <Button styleType="Tertiary" size="lg" startIcon={<IconFilter size={3} />}>
              Filters
            </Button>
          </div>

          <div className={css({ overflowX: 'auto', maxW: '100%' })}>
            <ContentSwitch size="lg">
              {SEGMENTS.map((s) => (
                <ContentSwitch.Item key={s} selected={segment === s} onClick={() => setSegment(s)}>
                  {s}
                </ContentSwitch.Item>
              ))}
            </ContentSwitch>
          </div>
        </div>

        {/* Table */}
        <div className={css({ overflowX: 'auto' })}>
        <Table lines>
          <Table.Header>
            <Table.Row>
              <Table.Cell as="th"><SortableHeader label="Property" /></Table.Cell>
              <Table.Cell as="th"><SortableHeader label="Agent" /></Table.Cell>
              <Table.Cell as="th"><SortableHeader label="List date" /></Table.Cell>
              <Table.Cell as="th">Performance</Table.Cell>
              <Table.Cell as="th">Completeness</Table.Cell>
              <Table.Cell as="th">Promotion</Table.Cell>
              <Table.Cell as="th">Buyers</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {listings.map((l) => (
              <Table.Row key={l.id}>
                {/* Property */}
                <Table.Cell>
                  <div className={hstack({ gap: '400', alignItems: 'center' })}>
                    <img
                      src={l.photo}
                      alt=""
                      className={css({
                        w: '56px',
                        h: '48px',
                        borderRadius: '200',
                        objectFit: 'cover',
                        flexShrink: 0,
                        bg: 'bg.alternate',
                      })}
                    />
                    <div className={vstack({ alignItems: 'flex-start', gap: '0' })}>
                      <Link
                        href="#"
                        underline="default"
                        size="inline"
                        onClick={(e) => {
                          e.preventDefault()
                          onSelectListing(l.id)
                        }}
                      >
                        {l.address1}
                      </Link>
                      <Link
                        href="#"
                        underline="default"
                        size="inline"
                        onClick={(e) => {
                          e.preventDefault()
                          onSelectListing(l.id)
                        }}
                      >
                        {l.address2}
                      </Link>
                      <span className={css({ textStyle: 'bodySm', color: 'text.alternate' })}>
                        {l.price}
                      </span>
                    </div>
                  </div>
                </Table.Cell>

                {/* Agent */}
                <Table.Cell>
                  <span
                    className={css({
                      textStyle: 'bodySm',
                      color: 'text.base',
                      display: 'block',
                      maxW: '140px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    })}
                  >
                    {l.agent}
                  </span>
                </Table.Cell>

                {/* List date */}
                <Table.Cell>
                  <div className={vstack({ alignItems: 'flex-start', gap: '0' })}>
                    <span className={css({ textStyle: 'bodySm', fontWeight: 'medium', color: 'text.base' })}>
                      {l.listDate}
                    </span>
                    <span className={css({ textStyle: 'bodySm', color: 'text.alternate' })}>
                      {l.daysAgo}
                    </span>
                  </div>
                </Table.Cell>

                {/* Performance */}
                <Table.Cell>
                  <Tag
                    dataColor={PERFORMANCE_COLOR[l.performance]}
                    className={css({ whiteSpace: 'nowrap' })}
                  >
                    {l.performance}
                  </Tag>
                </Table.Cell>

                {/* Completeness */}
                <Table.Cell>
                  <Completeness value={l.completeness} color={l.completenessColor} />
                </Table.Cell>

                {/* Promotion */}
                <Table.Cell>
                  {l.promoted ? (
                    <div className={vstack({ alignItems: 'flex-start', gap: '200' })}>
                      <span className={css({ textStyle: 'bodySm', fontWeight: 'medium', color: 'text.base' })}>
                        Promoted
                      </span>
                      <Button
                        styleType="Tertiary"
                        size="sm"
                        startIcon={<IconSparklesSm size={2} />}
                        onClick={() => onEnhance(l)}
                        className={css({ whiteSpace: 'nowrap' })}
                      >
                        Add media
                      </Button>
                    </div>
                  ) : (
                    <div className={vstack({ alignItems: 'flex-start', gap: '100' })}>
                      <Link
                        href="#"
                        underline="default"
                        size="inline"
                        startIcon={<IconZap size={2} />}
                        onClick={(e) => {
                          e.preventDefault()
                          onPromote(l)
                        }}
                      >
                        Promote
                      </Link>
                      <span className={css({ textStyle: 'caption', color: 'text.alternate' })}>
                        {l.promotionStatus}
                      </span>
                    </div>
                  )}
                </Table.Cell>

                {/* Buyers */}
                <Table.Cell>
                  <span className={css({ textStyle: 'bodySm', color: 'text.base' })}>{l.buyers}</span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        </div>

        {/* Pagination */}
        <div className={hstack({ justifyContent: 'center', px: '600', py: '500' })}>
          <Pagination pageCount={13} page={page} asButton onPageClick={setPage} />
        </div>
      </Card>
    </div>
  )
}

// ─── Promote listings screen ─────────────────────────────────────────────────────

function PromoteListingsScreen({
  listings,
  onBack,
  onSelectListing,
  onRequestPromote,
}: {
  listings: Listing[]
  onBack: () => void
  onSelectListing: (id: string) => void
  onRequestPromote: (listings: Listing[]) => void
}) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const BreadcrumbLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <BackToListingsLink onBack={onBack} {...props} />
  )

  const eligible = listings.filter((l) => !l.promoted)
  const filtered = eligible.filter((l) =>
    `${l.address1} ${l.address2}`.toLowerCase().includes(search.toLowerCase())
  )

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handlePromoteSelected = () => {
    const selectedListings = listings.filter((l) => selected.has(l.id))
    onRequestPromote(selectedListings)
    setSelected(new Set())
  }

  return (
    <div className={vstack({ alignItems: 'stretch', gap: '700' })}>
      <div className={vstack({ alignItems: 'flex-start', gap: '400' })}>
        <Breadcrumbs
          items={[{ text: 'Spotlight Listings', href: '#' }, { text: 'Promote listings' }]}
          LinkComponent={BreadcrumbLink}
        />
        <h1 className={css({ textStyle: 'headingLg', fontWeight: 'bold', color: 'text.base' })}>
          Promote listings
        </h1>
      </div>

      {/* Selected listings card */}
      <Card className={css({ px: '600', py: '600' })}>
        <div className={vstack({ alignItems: 'flex-start', gap: '500' })}>
          <h2 className={css({ textStyle: 'headingSm', color: 'text.base' })}>Selected listings</h2>
          <InlineMessage styleType="info" title={`${AVAILABLE_PROMOTIONS} promotions available`}>
            Apply to a listing below to get premium placement and increased visibility.
          </InlineMessage>
        </div>
      </Card>

      {/* Table card */}
      <Card>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            sm: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
            gap: '400',
            px: { base: '400', sm: '600' },
            pt: '600',
            pb: '500',
          })}
        >
          <div className={vstack({ alignItems: 'flex-start', gap: '100' })}>
            <span className={css({ textStyle: 'bodyMd', fontWeight: 'bold', color: 'text.base' })}>
              Select listings for promotion
            </span>
            <span className={css({ textStyle: 'caption', color: 'text.alternate' })}>
              {eligible.length} promotions available
            </span>
          </div>
          {selected.size > 0 && (
            <div className={hstack({ gap: '400', flexWrap: 'wrap' })}>
              <Button styleType="Tertiary" size="lg" onClick={() => setSelected(new Set())}>
                Clear all
              </Button>
              <Button styleType="Primary" size="lg" onClick={handlePromoteSelected}>
                Promote {selected.size} listing{selected.size === 1 ? '' : 's'}
              </Button>
            </div>
          )}
        </div>

        <div className={css({ px: { base: '400', sm: '600' }, pb: '500' })}>
          <div className={css({ w: { base: '100%', xs: '320px' } })}>
            <Search
              size="inline"
              placeholder="Search for a listing"
              value={search}
              sections={[]}
              onInputChange={(v) => setSearch(v)}
              onSearch={() => {}}
            />
          </div>
        </div>

        <div className={css({ overflowX: 'auto' })}>
        <Table lines>
          <Table.Header>
            <Table.Row>
              <Table.Cell as="th" />
              <Table.Cell as="th"><SortableHeader label="Property" /></Table.Cell>
              <Table.Cell as="th"><SortableHeader label="Agent" /></Table.Cell>
              <Table.Cell as="th"><SortableHeader label="List date" /></Table.Cell>
              <Table.Cell as="th">Completeness</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filtered.map((l) => (
              <Table.Row key={l.id}>
                <Table.Cell>
                  <Checkbox checked={selected.has(l.id)} onChange={() => toggleSelect(l.id)} />
                </Table.Cell>

                {/* Property */}
                <Table.Cell>
                  <div className={hstack({ gap: '400', alignItems: 'center' })}>
                    <img
                      src={l.photo}
                      alt=""
                      className={css({
                        w: '56px',
                        h: '48px',
                        borderRadius: '200',
                        objectFit: 'cover',
                        flexShrink: 0,
                        bg: 'bg.alternate',
                      })}
                    />
                    <div className={vstack({ alignItems: 'flex-start', gap: '0' })}>
                      <Link
                        href="#"
                        underline="default"
                        size="inline"
                        onClick={(e) => {
                          e.preventDefault()
                          onSelectListing(l.id)
                        }}
                      >
                        {l.address1}
                      </Link>
                      <Link
                        href="#"
                        underline="default"
                        size="inline"
                        onClick={(e) => {
                          e.preventDefault()
                          onSelectListing(l.id)
                        }}
                      >
                        {l.address2}
                      </Link>
                      <span className={css({ textStyle: 'bodySm', color: 'text.alternate' })}>
                        {l.price}
                      </span>
                    </div>
                  </div>
                </Table.Cell>

                {/* Agent */}
                <Table.Cell>
                  <span
                    className={css({
                      textStyle: 'bodySm',
                      color: 'text.base',
                      display: 'block',
                      maxW: '140px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    })}
                  >
                    {l.agent}
                  </span>
                </Table.Cell>

                {/* List date */}
                <Table.Cell>
                  <div className={vstack({ alignItems: 'flex-start', gap: '0' })}>
                    <span className={css({ textStyle: 'bodySm', fontWeight: 'medium', color: 'text.base' })}>
                      {l.listDate}
                    </span>
                    <span className={css({ textStyle: 'bodySm', color: 'text.alternate' })}>
                      {l.daysAgo}
                    </span>
                  </div>
                </Table.Cell>

                {/* Completeness */}
                <Table.Cell>
                  <Completeness value={l.completeness} color={l.completenessColor} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        </div>

        {/* Pagination */}
        <div className={hstack({ justifyContent: 'center', px: '600', py: '500' })}>
          <Pagination pageCount={5} page={page} asButton onPageClick={setPage} />
        </div>
      </Card>
    </div>
  )
}

// ─── Listing detail screen ───────────────────────────────────────────────────────

function BackToListingsLink({
  onBack,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { onBack: () => void }) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        e.preventDefault()
        onBack()
      }}
    />
  )
}

function ListingDetailScreen({
  listing,
  onBack,
  onPromote,
  onEnhance,
}: {
  listing: Listing
  onBack: () => void
  onPromote: (listing: Listing) => void
  onEnhance: (listing: Listing) => void
}) {
  const BreadcrumbLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <BackToListingsLink onBack={onBack} {...props} />
  )
  const [walkthroughAdded, setWalkthroughAdded] = useState(true)
  const [pendingToggle, setPendingToggle] = useState<'add' | 'remove' | null>(null)

  const contentRef = useRef<HTMLDivElement>(null)
  const [photoHeight, setPhotoHeight] = useState<number | null>(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useLayoutEffect(() => {
    if (contentRef.current) {
      setPhotoHeight(contentRef.current.getBoundingClientRect().height)
    }
  }, [listing.id, isDesktop])

  const initials = listing.agent.split(' ')

  return (
    <div className={vstack({ alignItems: 'stretch', gap: '700' })}>
      {/* Header */}
      <div className={vstack({ alignItems: 'flex-start', gap: '600' })}>
        <Breadcrumbs
          items={[
            { text: 'All listings', href: '#' },
            { text: `${listing.address1}, ${listing.address2}` },
          ]}
          LinkComponent={BreadcrumbLink}
        />

        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            md: { flexDirection: 'row' },
            gap: '500',
            alignItems: 'flex-start',
            w: '100%',
          })}
        >
          <div
            className={css({
              borderRadius: '300',
              overflow: 'hidden',
              flexShrink: 0,
              bg: 'bg.alternate',
              w: { base: '100%', md: 'auto' },
              aspectRatio: { base: '4 / 3', md: 'auto' },
            })}
            style={
              isDesktop
                ? {
                    height: photoHeight ?? undefined,
                    width: photoHeight ? (photoHeight * 4) / 3 : undefined,
                  }
                : undefined
            }
          >
            <img
              src={listing.photo}
              alt=""
              className={css({ w: '100%', h: '100%', objectFit: 'cover', display: 'block' })}
            />
          </div>
          <div
            ref={contentRef}
            className={vstack({ alignItems: 'flex-start', gap: '300', w: '100%' })}
          >
            <div className={hstack({ gap: '200', alignItems: 'center', flexWrap: 'wrap' })}>
              {listing.promoted && (
                <Tag dataColor="blue" startIcon={<IconZap size={2} />}>
                  Spotlight Listing
                </Tag>
              )}
              <Tag dataColor="green">For Sale</Tag>
              <Tag dataColor="graySubtle" startIcon={<IconCalendar size={2} />}>
                {listing.daysAgo.replace(' ago', ' on market')}
              </Tag>
            </div>
            <h1 className={css({ textStyle: 'headingLg', fontWeight: 'bold', color: 'text.base' })}>
              {listing.address1}, {listing.address2}
            </h1>
            <div className={hstack({ gap: '300', alignItems: 'center' })}>
              <span className={css({ textStyle: 'bodyMd', color: 'text.alternate' })}>
                {listing.price}
              </span>
              <span className={css({ textStyle: 'bodyMd', color: 'text.alternate' })}>•</span>
              <span className={css({ textStyle: 'bodyMd', color: 'text.alternate' })}>
                Listed: {formatListedDate(listing.listDate)}
              </span>
            </div>
            <div className={hstack({ gap: '400', alignItems: 'center' })}>
              <div className={hstack({ gap: '300', alignItems: 'center' })}>
                <Avatar size="xs" initials={initials} />
                <Link href="#" underline="default" size="inline">
                  {listing.agent}
                </Link>
              </div>
              <Link href="#" underline="default" size="lg" endIcon={<IconOpen size={2} />}>
                View on Realtor.com
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details">
        <Tabs.List>
          <Tabs.Trigger value="insights">Insights</Tabs.Trigger>
          <Tabs.Trigger value="details">Listing details</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="insights">
          <div className={vstack({ alignItems: 'center', justifyContent: 'center', minH: '400px' })}>
            <EmptyPlaceholder
              media={<IconBarChart size={5} />}
              title="Insights coming soon"
              description="Performance and buyer engagement insights for this listing will appear here."
            />
          </div>
        </Tabs.Content>
        <Tabs.Content value="details">
          <div
            className={css({
              mt: '400',
              bg: 'bg.base',
              borderWidth: '100',
              borderStyle: 'solid',
              borderColor: 'border.base',
              borderRadius: '300',
              p: { base: '500', md: '800' },
              display: 'flex',
              flexDirection: 'column',
              gap: '400',
            })}
          >
            {listing.mediaEnhanced ? (
              <div className={vstack({ alignItems: 'flex-start', gap: '600', w: '100%' })}>
                <div className={vstack({ alignItems: 'flex-start', gap: '200', w: '100%' })}>
                  <div
                    className={hstack({
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '400',
                      w: '100%',
                    })}
                  >
                    <div className={hstack({ gap: '400', alignItems: 'center' })}>
                      <IconRealAssist size={3} />
                      <h2 className={css({ textStyle: 'headingSm', color: 'text.base' })}>
                        Enhanced media
                      </h2>
                    </div>
                    <Toggle
                      checked={walkthroughAdded}
                      onChange={(_, checked) => setPendingToggle(checked ? 'add' : 'remove')}
                    >
                      {walkthroughAdded ? 'On' : 'Off'}
                    </Toggle>
                  </div>
                  <p className={css({ textStyle: 'bodyMd', color: 'text.alternate', w: '100%' })}>
                    Your uploaded photos are enhanced with AI to make your Spotlight Listing stand
                    out. Turn it off at anytime.
                  </p>
                </div>

                <div className={vstack({ alignItems: 'flex-start', gap: '200' })}>
                  <div className={hstack({ gap: '500', alignItems: 'center', flexWrap: 'wrap' })}>
                    <div className={hstack({ gap: '200', alignItems: 'center', flexWrap: 'wrap' })}>
                      {listing.uploadedPhotos.slice(0, 4).map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt=""
                          className={css({
                            w: '95px',
                            h: '63px',
                            borderRadius: '200',
                            objectFit: 'cover',
                            flexShrink: 0,
                            bg: 'bg.alternate',
                          })}
                        />
                      ))}
                    </div>
                    <Button styleType="Tertiary" size="sm" onClick={() => onEnhance(listing)}>
                      Edit photos
                    </Button>
                  </div>
                  <span className={css({ textStyle: 'caption', color: 'text.alternate' })}>
                    Showing {Math.min(4, listing.uploadedPhotos.length)} of{' '}
                    {listing.uploadedPhotos.length} photos
                  </span>
                </div>
              </div>
            ) : (
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'column',
                  sm: { flexDirection: 'row', alignItems: 'center' },
                  alignItems: 'stretch',
                  gap: '500',
                  w: '100%',
                })}
              >
                {listing.promoted ? (
                  <>
                    <div className={vstack({ alignItems: 'flex-start', gap: '300', flex: '1' })}>
                      <h2 className={css({ textStyle: 'headingSm', color: 'text.base' })}>
                        Enhance your Spotlight Listing
                      </h2>
                      <p className={css({ textStyle: 'bodySm', color: 'text.alternate' })}>
                        Your Spotlight Listing is live. Add images and we'll transform your photos
                        into immersive video and AI-enhanced media, giving buyers a fuller picture of
                        the home and helping your listing stand out.
                      </p>
                    </div>
                    <Button
                      styleType="Primary"
                      size="lg"
                      startIcon={<IconSparklesSm size={3} />}
                      onClick={() => onEnhance(listing)}
                    >
                      Enhance promotion
                    </Button>
                  </>
                ) : (
                  <>
                    <div className={vstack({ alignItems: 'flex-start', gap: '300', flex: '1' })}>
                      <h2 className={css({ textStyle: 'headingSm', color: 'text.base' })}>
                        Promote with Spotlight Listings
                      </h2>
                      <p className={css({ textStyle: 'bodySm', color: 'text.alternate' })}>
                        Stand out with priority placement, now with AI-enhanced media to give buyers
                        a richer way to explore the listing.
                      </p>
                    </div>
                    <Button
                      styleType="Primary"
                      size="lg"
                      startIcon={<IconZap size={3} />}
                      onClick={() => onPromote(listing)}
                    >
                      Promote
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </Tabs.Content>
      </Tabs>

      <Modal
        open={pendingToggle !== null}
        onClose={() => setPendingToggle(null)}
        mobileLayout="fullScreen"
      >
        <Modal.Header
          title={
            pendingToggle === 'remove'
              ? 'Remove enhanced media from your listing?'
              : 'Add enhanced media to your listing?'
          }
        />
        <Modal.Body>
          <p className={css({ textStyle: 'bodyLg', color: 'text.base' })}>
            {pendingToggle === 'remove'
              ? 'Your AI enhanced media is live on your listing. Removing it will change how your listing appears to buyers.'
              : "We'll reuse the enhanced media already generated for this listing. No new media will be created."}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className={hstack({ gap: '400', justifyContent: 'flex-end', w: '100%' })}>
            <Button styleType="Tertiary" size="lg" onClick={() => setPendingToggle(null)}>
              Cancel
            </Button>
            <Button
              styleType="Primary"
              size="lg"
              onClick={() => {
                setWalkthroughAdded(pendingToggle === 'add')
                setPendingToggle(null)
              }}
            >
              {pendingToggle === 'remove' ? 'Remove from listing' : 'Add to listing'}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

// ─── Photo thumbnail ────────────────────────────────────────────────────────────

function PhotoThumbnail({
  src,
  onDelete,
  index,
  isDragging,
  isDropTarget,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: {
  src: string
  onDelete: () => void
  index: number
  isDragging: boolean
  isDropTarget: boolean
  onDragStart: (index: number) => void
  onDragOver: (index: number) => void
  onDrop: (index: number) => void
  onDragEnd: () => void
}) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move'
        onDragStart(index)
      }}
      onDragEnd={onDragEnd}
      onDragOver={(e) => {
        e.preventDefault()
        onDragOver(index)
      }}
      onDrop={(e) => {
        e.preventDefault()
        onDrop(index)
      }}
      className={css({
        position: 'relative',
        w: { base: '140px', xs: '160px', md: '190px' },
        aspectRatio: '3 / 2',
        borderRadius: '200',
        overflow: 'hidden',
        bg: 'bg.alternate',
        flexShrink: 0,
        cursor: 'grab',
        opacity: isDragging ? '0.4' : '1',
        outlineWidth: isDropTarget ? '3px' : '0px',
        outlineStyle: 'solid',
        outlineColor: 'border.focus',
        outlineOffset: '2px',
        transition: 'opacity 0.15s ease',
      })}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        className={css({ w: '100%', h: '100%', objectFit: 'cover', display: 'block' })}
      />
      <div
        draggable={false}
        className={css({ position: 'absolute', bottom: '200', right: '200' })}
      >
        <Menu width={180} placement="bottom-end" disableAutoFlip portalRoot={document.body}>
          <Menu.Toggle>
            <button
              type="button"
              aria-label="Photo options"
              className={css({
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                w: '32px',
                h: '32px',
                borderRadius: '500',
                bg: 'bg.inverse',
                color: 'text.inverse',
                cursor: 'pointer',
                _hoverSupported: { bg: 'bg.inverse.alternate' },
              })}
            >
              <IconMoreFilled size={2} />
            </button>
          </Menu.Toggle>
          <Menu.List>
            <ListBox.Item value="edit" startAddon={<IconEdit size={2} />}>
              Edit photo
            </ListBox.Item>
            <ListBox.Item value="delete" startAddon={<IconDelete size={2} />} onClick={onDelete}>
              Delete photo
            </ListBox.Item>
          </Menu.List>
        </Menu>
      </div>
    </div>
  )
}

// ─── Photo upload screen ─────────────────────────────────────────────────────────

const SAMPLE_HOUSE_PHOTOS = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=267&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=267&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=267&fit=crop',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=267&fit=crop',
  'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=267&fit=crop',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=267&fit=crop',
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&h=267&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=267&fit=crop',
]

function PhotoUploadScreen({
  listing,
  onBack,
  onSave,
}: {
  listing: Listing
  onBack: () => void
  onSave: (photos: string[]) => void
}) {
  const [photos, setPhotos] = useState<string[]>(listing.uploadedPhotos)
  const [optimize, setOptimize] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<{ index: number; src: string } | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handlePhotoDragStart = (index: number) => setDragIndex(index)

  const handlePhotoDragOver = (index: number) => {
    if (dragIndex === null || dragIndex === index) return
    setDragOverIndex(index)
  }

  const handlePhotoDrop = (index: number) => {
    setDragOverIndex(null)
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null)
      return
    }
    setPhotos((prev) => {
      const next = [...prev]
      const [moved] = next.splice(dragIndex, 1)
      next.splice(index, 0, moved)
      return next
    })
    setDragIndex(null)
  }

  const handlePhotoDragEnd = () => {
    setDragIndex(null)
    setDragOverIndex(null)
  }

  const handleDropzoneClick = () => {
    const remaining = SAMPLE_HOUSE_PHOTOS.filter((url) => !photos.includes(url))
    if (remaining.length === 0) return
    const batchSize = photos.length === 0 ? 5 : 3
    setPhotos((prev) => [...prev, ...remaining.slice(0, batchSize)])
  }

  const handleDeletePhoto = (index: number) => {
    const src = photos[index]
    if (listing.uploadedPhotos.includes(src)) {
      setDeleteTarget({ index, src })
    } else {
      setPhotos((prev) => prev.filter((_, i) => i !== index))
    }
  }

  return (
    <div className={css({ minH: '100dvh', bg: 'bg.base' })}>
      <div
        className={vstack({
          alignItems: 'stretch',
          gap: '600',
          px: { base: '400', sm: '800', md: '1600' },
          py: { base: '500', md: '800' },
          pb: { base: '1200', md: '1600' },
        })}
      >
        <div className={vstack({ alignItems: 'flex-start', gap: '300' })}>
          <h1 className={css({ textStyle: 'headingLg', fontWeight: 'bold', color: 'text.base' })}>
            Enhanced media photo upload
          </h1>
          <p className={css({ textStyle: 'bodyMd', color: 'text.base', maxW: '900px' })}>
            Upload every photo you have the rights to use. More photos means a richer, more immersive
            experience for buyers, from wide exterior shots to close-up details that tell the full
            story of the property.
          </p>
        </div>

        <div
          className={css({
            bg: 'bg.base',
            borderWidth: '100',
            borderStyle: 'solid',
            borderColor: 'border.base',
            borderRadius: '300',
            p: { base: '400', md: '800' },
            display: 'flex',
            flexDirection: 'column',
            gap: '600',
          })}
        >
          <div className={vstack({ alignItems: 'flex-start', gap: '100' })}>
            <span className={css({ textStyle: 'bodyMd', fontWeight: 'bold', color: 'text.base' })}>
              Photos ({photos.length})
            </span>
            <span className={css({ textStyle: 'caption', color: 'text.alternate' })}>
              Minimum 5 photos required for custom photos
            </span>
          </div>

          {/* Optimize toggle bubble */}
          <div
            className={hstack({
              gap: '500',
              alignItems: 'flex-start',
              bg: 'bg.alternate',
              borderRadius: '300',
              p: '500',
            })}
          >
            <IconMagicWand size={3} />
            <div className={vstack({ alignItems: 'flex-start', gap: '100', flex: '1' })}>
              <span className={css({ textStyle: 'bodyMd', fontWeight: 'bold', color: 'text.base' })}>
                Automatically optimize my photos
              </span>
              <span className={css({ textStyle: 'bodyMd', color: 'text.base' })}>
                Conservative enhancements only (lighting, color, geometry). ON by default.
              </span>
            </div>
            <Toggle checked={optimize} onChange={(_, checked) => setOptimize(checked)} />
          </div>

          {/* Dropzone */}
          <button
            type="button"
            onClick={handleDropzoneClick}
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '300',
              w: '100%',
              px: '600',
              py: '700',
              bg: 'bg.base',
              borderWidth: '200',
              borderStyle: 'dashed',
              borderColor: 'border.base',
              borderRadius: '200',
              cursor: 'pointer',
              _hoverSupported: { bg: 'bg.alternate' },
            })}
          >
            <IconUpload size={3} />
            <div className={vstack({ alignItems: 'center', gap: '200' })}>
              <span className={css({ textStyle: 'bodyMd', color: 'text.base' })}>
                Drag and drop your file(s) here or{' '}
                <span className={css({ textDecoration: 'underline', fontWeight: 'medium' })}>
                  browse files
                </span>
              </span>
              <span className={css({ textStyle: 'bodyMd', color: 'text.alternate' })}>
                JPG, PNG, HEIC | Max 20MB | Min 1,000px
              </span>
            </div>
          </button>

          {/* Thumbnails */}
          {photos.length > 0 && (
            <div className={hstack({ gap: '300', alignItems: 'center', flexWrap: 'wrap' })}>
              {photos.map((src, i) => (
                <PhotoThumbnail
                  key={src}
                  src={src}
                  index={i}
                  onDelete={() => handleDeletePhoto(i)}
                  isDragging={dragIndex === i}
                  isDropTarget={dragOverIndex === i && dragIndex !== i}
                  onDragStart={handlePhotoDragStart}
                  onDragOver={handlePhotoDragOver}
                  onDrop={handlePhotoDrop}
                  onDragEnd={handlePhotoDragEnd}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky footer */}
      <div
        className={css({
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          bg: 'bg.base',
          borderTopWidth: '100',
          borderTopStyle: 'solid',
          borderColor: 'border.base',
          boxShadow: 'dialog',
          p: '500',
        })}
      >
        <div className={hstack({ justifyContent: 'flex-end', gap: '400' })}>
          <Button styleType="Tertiary" size="lg" onClick={onBack}>
            Go back
          </Button>
          <Button
            styleType="Primary"
            size="lg"
            disabled={photos.length === 0}
            onClick={() => onSave(photos)}
          >
            Save images
          </Button>
        </div>
      </div>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} mobileLayout="fullScreen">
        <Modal.Header title="This photo is live on your listing" />
        <Modal.Body>
          <p className={css({ textStyle: 'bodyLg', color: 'text.base' })}>
            Deleting this photo will remove it from your listing photos, but it may still appear in
            AI-generated media that's already live.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className={hstack({ gap: '400', justifyContent: 'flex-end', w: '100%' })}>
            <Button styleType="Tertiary" size="lg" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              styleType="Primary"
              size="lg"
              onClick={() => {
                if (deleteTarget) {
                  setPhotos((prev) => prev.filter((_, i) => i !== deleteTarget.index))
                }
                setDeleteTarget(null)
              }}
            >
              Delete photo
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

// ─── Promote modal ──────────────────────────────────────────────────────────────

function PromoteModal({
  listings,
  onClose,
  onConfirm,
}: {
  listings: Listing[] | null
  onClose: () => void
  onConfirm: () => void
}) {
  const count = listings?.length ?? 0
  return (
    <Modal open={!!listings} onClose={onClose} mobileLayout="fullScreen">
      <Modal.Header
        title={`Apply ${count} of your ${AVAILABLE_PROMOTIONS} available promotions?`}
      />
      <Modal.Body>
        <p className={css({ textStyle: 'bodyLg', color: 'text.base' })}>
          {count === 1
            ? 'Your promotion will start shortly and run until the listing is sold or off market.'
            : 'Your promotions will start shortly and run until each listing is sold or off market.'}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div className={hstack({ gap: '400', justifyContent: 'flex-end', w: '100%' })}>
          <Button styleType="Tertiary" size="lg" onClick={onClose}>
            Cancel
          </Button>
          <Button styleType="Primary" size="lg" onClick={onConfirm}>
            Promote listing{count === 1 ? '' : 's'}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

// ─── Save images consent modal ───────────────────────────────────────────────────

function SaveImagesModal({
  open,
  onClose,
  onDeny,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  onDeny: () => void
  onConfirm: () => void
}) {
  const [agreed, setAgreed] = useState(false)

  const handleClose = () => {
    setAgreed(false)
    onClose()
  }

  const handleDeny = () => {
    setAgreed(false)
    onDeny()
  }

  return (
    <Modal open={open} onClose={handleClose} mobileLayout="fullScreen">
      <Modal.Header title="Allow Realtor.com to enhance your photos" />
      <Modal.Body>
        <div className={vstack({ alignItems: 'stretch', gap: '600' })}>
          <p className={css({ textStyle: 'bodyMd', color: 'text.base' })}>
            To publish your custom photos with immersive media, we need to ensure you are the
            copyright owner or authorized licensee of your photos.
          </p>

          <div
            className={vstack({
              alignItems: 'flex-start',
              gap: '400',
              bg: 'bg.alternate',
              borderRadius: '300',
              p: '600',
            })}
          >
            <span className={css({ textStyle: 'bodyMd', fontWeight: 'bold', color: 'text.base' })}>
              Terms &amp; Conditions
            </span>
            <p className={css({ textStyle: 'bodyMd', color: 'text.base' })}>
              By accepting, you grant Realtor.com a non-exclusive, worldwide, royalty free license
              to use, reproduce, display, and create derivative works of the photos you upload{' '}
              <strong>solely to produce and display enhanced media on your listing details page.</strong>
            </p>
            <p className={css({ textStyle: 'bodyMd', color: 'text.base' })}>
              You retain full ownership of your original photos. You may revoke this permission at
              any time from your listing edit page. Full terms available in our{' '}
              <Link href="#" underline="default" size="inline">
                Photo License Agreement.
              </Link>
            </p>
          </div>

          <div
            className={css({
              borderWidth: '100',
              borderStyle: 'solid',
              borderColor: 'border.base',
              borderRadius: '300',
              p: '500',
            })}
          >
            <Checkbox checked={agreed} onChange={(_, checked) => setAgreed(checked)}>
              I confirm that I am the copyright owner or authorized licensee of all photos I am
              uploading.
            </Checkbox>
          </div>

          <InlineMessage styleType="warning">
            If you deny permission, your photos will not be uploaded.
          </InlineMessage>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className={hstack({ gap: '400', justifyContent: 'flex-end', w: '100%' })}>
          <Button styleType="Ghost" onClick={handleDeny}>
            Deny permission
          </Button>
          <Button
            styleType="Primary"
            size="lg"
            disabled={!agreed}
            onClick={() => {
              setAgreed(false)
              onConfirm()
            }}
          >
            Save photos
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

// ─── Experience nav panel ─────────────────────────────────────────────────────────

type Experience = 'overview' | 'team' | 'agent'

const EXPERIENCES: { id: Experience; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Overview', icon: <IconBuildingOverview size={3} /> },
  { id: 'team', label: 'Team experience', icon: <IconUsers size={3} /> },
  { id: 'agent', label: 'Agent experience', icon: <IconAgent size={3} /> },
]

function ExperienceNavTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Switch experience"
      onClick={onClick}
      className={css({
        position: 'fixed',
        bottom: '500',
        left: '500',
        zIndex: 'toast',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        w: '48px',
        h: '48px',
        borderRadius: '500',
        bg: 'bg.inverse',
        color: 'text.inverse',
        cursor: 'pointer',
        boxShadow: 'dialog',
        _hoverSupported: { bg: 'bg.inverse.alternate' },
      })}
    >
      <IconGridView size={3} />
    </button>
  )
}

function ExperienceNavPanel({
  open,
  experience,
  onClose,
  onSelect,
  onReset,
}: {
  open: boolean
  experience: Experience
  onClose: () => void
  onSelect: (experience: Experience) => void
  onReset: () => void
}) {
  return (
    <Modal open={open} onClose={onClose} layout="drawer" drawerPosition="left" size="sm">
      <Modal.Header title="Prototype navigation" />
      <Modal.Body noPadding>
        <ListBox>
          {EXPERIENCES.map((exp) => (
            <ListBox.Item
              key={exp.id}
              value={exp.id}
              startAddon={exp.icon}
              selected={experience === exp.id}
              onClick={() => onSelect(exp.id)}
            >
              {exp.label}
            </ListBox.Item>
          ))}
          <ListBox.Divider />
          <ListBox.Item
            value="reset"
            startAddon={<IconRefreshCw size={3} />}
            onClick={onReset}
          >
            Reset prototype
          </ListBox.Item>
        </ListBox>
      </Modal.Body>
    </Modal>
  )
}

function PlaceholderExperience({ label }: { label: string }) {
  return (
    <div
      className={css({
        minH: '100dvh',
        pt: HEADER_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <EmptyPlaceholder
        title={label}
        description="This experience hasn't been brought into the prototype yet."
      />
    </div>
  )
}

// ─── Agent experience: enhanced media email preview ──────────────────────────────

const INBOX_MESSAGES = [
  {
    id: 'enhanced-media',
    sender: 'realtor.com PRO',
    subject: 'Your listing now has enhanced media',
    snippet: 'Your team has added enhanced media to 456 Maple Drive...',
    time: '9:41 AM',
  },
  {
    id: '2',
    sender: 'Realtor.com PRO Support',
    subject: 'Your monthly performance report is ready',
    snippet: 'See how your listings performed in June...',
    time: '2 days ago',
  },
  {
    id: '3',
    sender: 'LeadConnect',
    subject: 'New lead: Sarah Chen is interested',
    snippet: 'A buyer has requested more info on a listing...',
    time: '3 days ago',
  },
  {
    id: '4',
    sender: 'MLS Connect',
    subject: 'Listing sync completed for 12 properties',
    snippet: 'Your MLS data has been synced successfully...',
    time: '5 days ago',
  },
  {
    id: '5',
    sender: 'DocuSign',
    subject: 'Please sign: Listing agreement',
    snippet: 'Bobby Martinez sent you a document to sign...',
    time: '1 week ago',
  },
]

// ─── Legacy listing detail page (destination when clicking the email) ────────────

const LEGACY_BLUE = '[#4052a2]'
const LEGACY_DARK = '[#181c24]'
const LEGACY_GRAY = '[#616f86]'
const LEGACY_BORDER = '[#e3e6e9]'
const LEGACY_BG = '[#f8f8f9]'
const LEGACY_INPUT_BORDER = '[#b9bfc9]'
const LEGACY_NAV_ACTIVE = '[#364bc4]'
const LEGACY_BREADCRUMB = '[#48566c]'
const LEGACY_RED = '[#d92228]'
const LEGACY_STRIPE = '[#6677d0]'

const LEGACY_NAV_ITEMS = ['Home', 'Contacts', 'Tasks', 'Listings', 'Listing presentations']
const LEGACY_NAV_DROPDOWNS = ['Profile', 'Performance', 'My Team', 'Products & Billing', 'Help']
const LEGACY_TABS = ['Performance', 'Matching buyers', 'Promotions', 'Listing details']

const LEGACY_RECOMMENDATIONS = [
  {
    title: 'Add at least 11 photos',
    description: 'Listings with at least 11 photos get more potential buyer interest',
    actions: ['Add here', 'Add on your MLS'],
    lift: '+5%',
  },
  {
    title: 'Add at least 1 school',
    description: 'Listings with the high school district/name attract more interest from potential buyers',
    actions: ['Add on your MLS'],
    lift: '+5%',
  },
  {
    title: 'Add HOA/Association fee amount',
    description: 'About 16% of buyers place value on knowing the homeowner association (HOA) fee amount',
    actions: ['Add on your MLS'],
    lift: '+2%',
  },
]

const LEGACY_PROPERTY_FACTS = [
  { label: 'property type', value: 'Single family' },
  { label: 'bed', value: '3' },
  { label: 'bath', value: '2.5' },
  { label: 'sqft', value: '1,870' },
  { label: 'sqft lot', value: '2,794' },
  { label: 'year built', value: '2007' },
]

const LEGACY_JUMP_LINKS = ['Description', 'Brokerage link', 'Virtual tour', 'Open houses', 'Photos']

const LEGACY_DESCRIPTION_TEXT =
  "Beautiful, loved, well-maintained 4-bedroom 2.5 bathroom South Austin home on .23480 of an acre lot! Spacious open floor plan with numerous upgrades throughout the home. Hard surface flooring on the entire first floor. This home has an office with French doors and a first floor flex room that could be used as you choose. The spacious open living and dining area lead you to the large backyard with an extended patio/deck, an outdoor kitchen, and a fire pit. A large walk-in closet with custom built in dressers and shelves. New HVAC 2021! Great location in desirable South Austin, a short drive to downtown, and shopping."

const LEGACY_OPEN_HOUSE_ROWS = [
  { date: '05/28/2022', start: '11:00 AM', end: '5:00 PM' },
  { date: '05/29/2022', start: '11:00 AM', end: '5:00 PM' },
]

function LegacyRadioRow({
  name,
  label,
  checked,
}: {
  name: string
  label: string
  checked: boolean
}) {
  return (
    <label className={hstack({ gap: '300', alignItems: 'center', cursor: 'pointer' })}>
      <input type="radio" name={name} defaultChecked={checked} />
      <span className={css({ fontSize: '[16px]', color: LEGACY_DARK })}>{label}</span>
    </label>
  )
}

function LegacyEditCard({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div
      id={id}
      className={css({
        bg: 'white',
        borderRadius: '[16px]',
        p: { base: '500', md: '800' },
      })}
    >
      <h2 className={css({ fontSize: '[24px]', lineHeight: '[32px]', fontWeight: '600', color: LEGACY_DARK })}>
        {title}
      </h2>
      <p className={css({ fontSize: '[14px]', lineHeight: '[20px]', color: LEGACY_GRAY, mt: '300', maxW: '700px' })}>
        {description}
      </p>
      <div className={vstack({ alignItems: 'flex-start', gap: '400', mt: '600', w: '100%' })}>
        {children}
      </div>
    </div>
  )
}

function LegacyPhotoBanner() {
  return (
    <div
      className={hstack({
        gap: '300',
        alignItems: 'flex-start',
        bg: LEGACY_BG,
        borderRadius: '200',
        p: '500',
      })}
    >
      <IconInfo size={3} />
      <div className={vstack({ alignItems: 'flex-start', gap: '300' })}>
        <span className={css({ fontSize: '[16px]', fontWeight: '700', color: LEGACY_DARK })}>
          Changes to your photos have been made on your behalf
        </span>
        <span className={css({ fontSize: '[16px]', fontWeight: '400', color: LEGACY_DARK })}>
          Your team has updated your listing with enhanced media for Spotlight Listings. Any
          changes must be made by your team.
        </span>
      </div>
    </div>
  )
}

const LEGACY_FONT_STACK = '"Rubik", -apple-system, Helvetica, Arial, sans-serif'
const LEGACY_NAV_FONT_STACK = '"Roboto", -apple-system, Helvetica, Arial, sans-serif'

function LegacyFontOverride() {
  return (
    <style>{`
      [data-legacy-root], [data-legacy-root] * {
        font-family: ${LEGACY_FONT_STACK} !important;
      }
      [data-legacy-root] [data-legacy-nav], [data-legacy-root] [data-legacy-nav] * {
        font-family: ${LEGACY_NAV_FONT_STACK} !important;
      }
    `}</style>
  )
}

function LegacyEditListingModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      data-legacy-root
      className={css({
        position: 'fixed',
        inset: '0',
        zIndex: 'toast',
        bg: LEGACY_BG,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <LegacyFontOverride />
      {/* Header */}
      <div
        className={hstack({
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { base: '400', md: '800' },
          py: '600',
          bg: 'white',
          borderBottomWidth: '100',
          borderBottomStyle: 'solid',
          borderColor: LEGACY_BORDER,
          flexShrink: 0,
        })}
      >
        <span className={css({ fontSize: '[20px]', fontWeight: '500', color: LEGACY_DARK })}>
          Edit listing details
        </span>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={css({
            display: 'inline-flex',
            border: 'none',
            bg: 'transparent',
            cursor: 'pointer',
            color: LEGACY_DARK,
          })}
        >
          <IconClose size={3} />
        </button>
      </div>

      {/* Body */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          md: { flexDirection: 'row' },
          alignItems: 'flex-start',
          gap: { base: '500', md: '900' },
          flex: '1',
          px: { base: '400', sm: '600', md: '800' },
          py: { base: '500', md: '700' },
        })}
      >
        {/* Jump to nav */}
        <div
          className={css({
            display: { base: 'none', md: 'flex' },
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '400',
            w: '160px',
            flexShrink: 0,
          })}
        >
          <span className={css({ fontSize: '[16px]', fontWeight: '600', color: LEGACY_DARK })}>
            Jump to:
          </span>
          {LEGACY_JUMP_LINKS.map((link) => (
            <a
              key={link}
              href={`#legacy-edit-${link.toLowerCase().replace(/\s+/g, '-')}`}
              className={css({
                fontSize: '[16px]',
                color: LEGACY_BLUE,
                textDecoration: 'underline',
                fontWeight: '500',
              })}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Content cards */}
        <div className={vstack({ alignItems: 'stretch', gap: '600', flex: '1', maxW: '760px' })}>
          <LegacyEditCard
            id="legacy-edit-description"
            title="Description"
            description="Edits to this description will show up on this listing on realtor.com. Edits to property specs such as bed and bath counts can be done only through your MLS."
          >
            <LegacyRadioRow name="description-source" label="Use description from MLS" checked={false} />
            <LegacyRadioRow name="description-source" label="Enter a custom description" checked />
            <div className={vstack({ alignItems: 'flex-start', gap: '200', w: '100%' })}>
              <span className={css({ fontSize: '[14px]', fontWeight: '500', color: LEGACY_DARK })}>
                Description
              </span>
              <textarea
                defaultValue={LEGACY_DESCRIPTION_TEXT}
                rows={7}
                className={css({
                  w: '100%',
                  borderWidth: '100',
                  borderStyle: 'solid',
                  borderColor: LEGACY_INPUT_BORDER,
                  borderRadius: '200',
                  px: '400',
                  py: '[15px]',
                  fontSize: '[16px]',
                  color: LEGACY_DARK,
                  fontFamily: 'inherit',
                  resize: 'vertical',
                })}
              />
              <span className={css({ fontSize: '[12px]', fontWeight: '500', color: LEGACY_GRAY })}>
                {LEGACY_DESCRIPTION_TEXT.length}/2500 characters
              </span>
            </div>
          </LegacyEditCard>

          <LegacyEditCard
            id="legacy-edit-brokerage-link"
            title="Brokerage link"
            description={'This is a link to your brokerage firm’s website. It will appear in the "Brokered by" section of this listing on realtor.com.'}
          >
            <LegacyRadioRow name="brokerage-link-source" label="Use brokerage link from MLS" checked={false} />
            <LegacyRadioRow name="brokerage-link-source" label="Enter supported custom link" checked />
            <LegacyRadioRow name="brokerage-link-source" label="Don't show link on realtor.com®" checked={false} />
            <div className={vstack({ alignItems: 'flex-start', gap: '200', w: '100%' })}>
              <span className={css({ fontSize: '[14px]', fontWeight: '500', color: LEGACY_DARK })}>
                Brokerage URL
              </span>
              <input
                type="text"
                defaultValue="http://austinsouthwest.kwoffice.com"
                className={css({
                  w: '100%',
                  borderWidth: '100',
                  borderStyle: 'solid',
                  borderColor: LEGACY_INPUT_BORDER,
                  borderRadius: '200',
                  px: '400',
                  py: '[15px]',
                  fontSize: '[16px]',
                  color: LEGACY_DARK,
                })}
              />
            </div>
          </LegacyEditCard>

          <LegacyEditCard
            id="legacy-edit-virtual-tour"
            title="Virtual tour"
            description={'A link to a tour from Matterport, Asteroom, or CloudPano will appear as a "3D Tour" button on this listing on realtor.com®. A link to a video tour (YouTube or Vimeo) or virtual tour (personalized website) will appear as a "Virtual Tour" button.'}
          >
            <LegacyRadioRow name="tour-link-source" label="Use provided tour link from MLS" checked={false} />
            <LegacyRadioRow name="tour-link-source" label="Enter supported custom link" checked />
            <LegacyRadioRow name="tour-link-source" label="Don't show tour link on realtor.com®" checked={false} />
            <div className={vstack({ alignItems: 'flex-start', gap: '200', w: '100%' })}>
              <span className={css({ fontSize: '[14px]', fontWeight: '500', color: LEGACY_DARK })}>
                Tour URL
              </span>
              <input
                type="text"
                defaultValue="http://tour.kwarealty.com/123-Main-Street-Austin-TX-78701/"
                className={css({
                  w: '100%',
                  borderWidth: '100',
                  borderStyle: 'solid',
                  borderColor: LEGACY_INPUT_BORDER,
                  borderRadius: '200',
                  px: '400',
                  py: '[15px]',
                  fontSize: '[16px]',
                  color: LEGACY_DARK,
                })}
              />
            </div>
          </LegacyEditCard>

          <LegacyEditCard
            id="legacy-edit-open-houses"
            title="Open houses"
            description="Up to 4 upcoming open houses will appear on realtor.com®. Any more will be placed in a queue and added as older ones pass."
          >
            <div className={vstack({ alignItems: 'flex-start', gap: '100' })}>
              <span className={css({ fontSize: '[16px]', fontWeight: '600', color: LEGACY_DARK })}>
                Synced from MLS
              </span>
              <span className={css({ fontSize: '[16px]', color: LEGACY_GRAY })}>None</span>
            </div>

            {LEGACY_OPEN_HOUSE_ROWS.map((row, i) => (
              <div
                key={i}
                className={hstack({ gap: '500', alignItems: 'flex-end', flexWrap: 'wrap' })}
              >
                <div className={vstack({ alignItems: 'flex-start', gap: '200' })}>
                  <span className={css({ fontSize: '[14px]', fontWeight: '500', color: LEGACY_DARK })}>
                    Date
                  </span>
                  <div
                    className={hstack({
                      gap: '300',
                      alignItems: 'center',
                      borderWidth: '100',
                      borderStyle: 'solid',
                      borderColor: LEGACY_INPUT_BORDER,
                      borderRadius: '200',
                      px: '400',
                      py: '300',
                    })}
                  >
                    <span className={css({ fontSize: '[16px]', color: LEGACY_DARK })}>{row.date}</span>
                    <IconCalendar size={2} />
                  </div>
                </div>
                <div className={vstack({ alignItems: 'flex-start', gap: '200' })}>
                  <span className={css({ fontSize: '[14px]', fontWeight: '500', color: LEGACY_DARK })}>
                    Start time
                  </span>
                  <div
                    className={hstack({
                      gap: '300',
                      alignItems: 'center',
                      borderWidth: '100',
                      borderStyle: 'solid',
                      borderColor: LEGACY_INPUT_BORDER,
                      borderRadius: '200',
                      px: '400',
                      py: '300',
                    })}
                  >
                    <span className={css({ fontSize: '[16px]', color: LEGACY_DARK })}>{row.start}</span>
                    <IconChevronDown size={2} />
                  </div>
                </div>
                <div className={vstack({ alignItems: 'flex-start', gap: '200' })}>
                  <span className={css({ fontSize: '[14px]', fontWeight: '500', color: LEGACY_DARK })}>
                    End time
                  </span>
                  <div
                    className={hstack({
                      gap: '300',
                      alignItems: 'center',
                      borderWidth: '100',
                      borderStyle: 'solid',
                      borderColor: LEGACY_INPUT_BORDER,
                      borderRadius: '200',
                      px: '400',
                      py: '300',
                    })}
                  >
                    <span className={css({ fontSize: '[16px]', color: LEGACY_DARK })}>{row.end}</span>
                    <IconChevronDown size={2} />
                  </div>
                </div>
                <span
                  className={css({
                    fontSize: '[16px]',
                    fontWeight: '500',
                    color: LEGACY_BLUE,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    pb: '300',
                  })}
                >
                  Remove
                </span>
              </div>
            ))}

            <button
              type="button"
              className={css({
                borderWidth: '200',
                borderStyle: 'solid',
                borderColor: LEGACY_BLUE,
                color: LEGACY_BLUE,
                bg: 'white',
                fontWeight: '500',
                fontSize: '[14px]',
                borderRadius: '200',
                px: '600',
                py: '300',
                cursor: 'pointer',
              })}
            >
              + Add open house
            </button>
          </LegacyEditCard>

          <div
            id="legacy-edit-photos"
            className={css({
              bg: 'white',
              borderRadius: '[16px]',
              p: { base: '500', md: '800' },
            })}
          >
            <h2 className={css({ fontSize: '[24px]', lineHeight: '[32px]', fontWeight: '600', color: LEGACY_DARK })}>
              Photos (13)
            </h2>
            <div className={hstack({ gap: '300', alignItems: 'center', flexWrap: 'wrap', mt: '500' })}>
              <IconPhotos size={3} />
              <span className={css({ fontSize: '[20px]', lineHeight: '[24px]', fontWeight: '600', color: LEGACY_DARK })}>
                Current photo source: Team upload
              </span>
            </div>
            <div className={css({ mt: '500' })}>
              <LegacyPhotoBanner />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={hstack({
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { base: '400', md: '800' },
          py: '600',
          bg: 'white',
          borderTopWidth: '100',
          borderTopStyle: 'solid',
          borderColor: LEGACY_BORDER,
          flexShrink: 0,
        })}
      >
        <button
          type="button"
          onClick={onClose}
          className={css({
            border: 'none',
            bg: 'transparent',
            color: LEGACY_BLUE,
            fontWeight: '500',
            fontSize: '[16px]',
            textDecoration: 'underline',
            cursor: 'pointer',
          })}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onClose}
          className={css({
            border: 'none',
            bg: LEGACY_RED,
            color: 'white',
            fontWeight: '700',
            fontSize: '[16px]',
            borderRadius: '200',
            px: '600',
            py: '500',
            cursor: 'pointer',
          })}
        >
          Publish changes
        </button>
      </div>
    </div>
  )
}

function LegacyListingDetailPage({ onBack }: { onBack: () => void }) {
  const [showEditModal, setShowEditModal] = useState(false)

  return (
    <div data-legacy-root className={css({ minH: '100dvh', bg: LEGACY_BG })}>
      <LegacyFontOverride />
      {showEditModal && <LegacyEditListingModal onClose={() => setShowEditModal(false)} />}
      {/* Utility bar */}
      <div
        data-legacy-nav
        className={css({
          bg: '[rgba(0,0,0,0.8)]',
          color: 'white',
          opacity: '[0.8]',
          fontSize: '[12px]',
          fontWeight: '300',
          px: '700',
          py: '300',
        })}
      >
        realtor.com® home page
      </div>
      <div className={css({ h: '4px', bg: LEGACY_STRIPE })} />

      {/* Header */}
      <div
        data-legacy-nav
        className={hstack({
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '300',
          px: { base: '400', md: '700' },
          py: '500',
          bg: 'white',
          borderBottomWidth: '100',
          borderBottomStyle: 'solid',
          borderColor: '[rgba(0,0,0,0.2)]',
        })}
      >
        <div className={hstack({ gap: '300', alignItems: 'center' })}>
          <LogoBrand className={css({ h: '22px', display: 'block' })} />
          <span className={css({ fontSize: '[16px]', color: LEGACY_GRAY })}>for Professionals</span>
        </div>
        <div className={hstack({ gap: '300', alignItems: 'center' })}>
          <div className={vstack({ alignItems: 'flex-end', gap: '0' })}>
            <span className={css({ fontSize: '[12px]', fontWeight: '300', color: '[black]', opacity: '[0.9]' })}>
              Welcome
            </span>
            <span className={css({ fontSize: '[14px]', fontWeight: '400', color: '[black]', opacity: '[0.9]' })}>
              Agent
            </span>
          </div>
          <div
            className={css({
              w: '40px',
              h: '40px',
              borderWidth: '100',
              borderStyle: 'solid',
              borderColor: '[rgba(0,0,0,0.1)]',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '[rgba(0,0,0,0.4)]',
            })}
          >
            <IconProfile size={3} />
          </div>
        </div>
      </div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          md: { flexDirection: 'row' },
          alignItems: 'stretch',
          gap: '0',
        })}
      >
        {/* Sidebar */}
        <div
          data-legacy-nav
          className={css({
            w: { base: '100%', md: '256px' },
            flexShrink: 0,
            bg: 'white',
            borderRightWidth: { base: '0', md: '100' },
            borderRightStyle: 'solid',
            borderBottomWidth: { base: '100', md: '0' },
            borderBottomStyle: 'solid',
            borderColor: LEGACY_BORDER,
            py: '600',
            minH: { base: 'auto', md: 'calc(100dvh - 76px)' },
          })}
        >
          {LEGACY_NAV_ITEMS.map((item) => (
            <div
              key={item}
              className={css({
                px: '700',
                py: '400',
                fontSize: '[16px]',
                fontWeight: item === 'Listings' ? '600' : '400',
                color: item === 'Listings' ? LEGACY_NAV_ACTIVE : '[black]',
                opacity: '[0.9]',
              })}
            >
              {item}
            </div>
          ))}
          <div className={css({ h: '1px', bg: '[rgba(0,0,0,0.1)]', my: '400' })} />
          {LEGACY_NAV_DROPDOWNS.map((item) => (
            <div
              key={item}
              className={hstack({
                justifyContent: 'space-between',
                alignItems: 'center',
                px: '700',
                py: '400',
              })}
            >
              <span className={css({ fontSize: '[16px]', color: '[black]', opacity: '[0.9]' })}>
                {item}
              </span>
              <IconChevronDown size={2} />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div
          className={css({
            flex: '1',
            minW: '0',
            px: { base: '400', sm: '600', md: '900' },
            py: { base: '500', md: '700' },
          })}
        >
          {/* Back link + actions */}
          <div
            className={hstack({
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '300',
              mb: '700',
            })}
          >
            <button
              type="button"
              onClick={onBack}
              className={hstack({
                gap: '200',
                alignItems: 'center',
                color: LEGACY_BREADCRUMB,
                cursor: 'pointer',
                border: 'none',
                bg: 'transparent',
              })}
            >
              <IconArrowLeft size={3} />
              <span className={css({ fontSize: '[18px]', fontWeight: '500', letterSpacing: '[0.18px]' })}>
                All Listings
              </span>
            </button>
            <div className={hstack({ gap: '400' })}>
              <button
                type="button"
                className={css({
                  borderWidth: '200',
                  borderStyle: 'solid',
                  borderColor: LEGACY_BLUE,
                  color: LEGACY_BLUE,
                  bg: 'white',
                  fontWeight: '500',
                  fontSize: '[14px]',
                  borderRadius: '200',
                  px: '600',
                  py: '400',
                  cursor: 'pointer',
                })}
              >
                Edit listing
              </button>
              <button
                type="button"
                className={css({
                  borderWidth: '200',
                  borderStyle: 'solid',
                  borderColor: LEGACY_BLUE,
                  color: LEGACY_BLUE,
                  bg: 'white',
                  fontWeight: '500',
                  fontSize: '[14px]',
                  borderRadius: '200',
                  px: '600',
                  py: '400',
                  cursor: 'pointer',
                })}
              >
                Share report
              </button>
            </div>
          </div>

          {/* Property header */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              xs: { flexDirection: 'row' },
              gap: '500',
              alignItems: 'flex-start',
              mb: '700',
            })}
          >
            <div className={css({ position: 'relative', flexShrink: 0 })}>
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=240&h=180&fit=crop"
                alt=""
                className={css({ w: '190px', h: '126px', borderRadius: '200', objectFit: 'cover', display: 'block' })}
              />
              <div
                className={hstack({
                  gap: '100',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: '200',
                  right: '200',
                  bg: '[rgba(51,51,51,0.75)]',
                  color: 'white',
                  borderRadius: '[100px]',
                  px: '300',
                  py: '100',
                })}
              >
                <IconCamera size={2} />
                <span className={css({ fontSize: '[14px]', fontWeight: '500' })}>10</span>
              </div>
            </div>
            <div className={vstack({ alignItems: 'flex-start', gap: '200' })}>
              <h1
                className={css({
                  fontSize: '[28px]',
                  lineHeight: '[36px]',
                  fontWeight: '600',
                  color: LEGACY_DARK,
                })}
              >
                123 Main Street, Austin, TX 78731
              </h1>
              <div className={hstack({ gap: '400', alignItems: 'center', flexWrap: 'wrap' })}>
                <span className={css({ fontSize: '[16px]', color: LEGACY_GRAY })}>
                  BrightMLS 12345678
                </span>
                <span className={css({ fontSize: '[16px]', color: LEGACY_GRAY })}>$565,000</span>
                <span className={css({ fontSize: '[16px]', color: LEGACY_GRAY })}>
                  Listed: Oct 1, 2022
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div
            className={hstack({
              gap: '700',
              borderBottomWidth: '100',
              borderBottomStyle: 'solid',
              borderColor: LEGACY_BORDER,
              mb: '700',
              overflowX: 'auto',
              flexShrink: '0',
            })}
          >
            {LEGACY_TABS.map((tab) => {
              const active = tab === 'Listing details'
              return (
                <span
                  key={tab}
                  className={css({
                    fontSize: '[16px]',
                    fontWeight: active ? '500' : '400',
                    color: active ? LEGACY_DARK : LEGACY_GRAY,
                    pb: '400',
                    borderBottomWidth: active ? '[4px]' : '0',
                    borderBottomStyle: 'solid',
                    borderColor: LEGACY_DARK,
                    whiteSpace: 'nowrap',
                    flexShrink: '0',
                  })}
                >
                  {tab}
                </span>
              )
            })}
          </div>

          {/* Listing completeness card */}
          <div
            className={css({
              bg: 'white',
              borderWidth: '100',
              borderStyle: 'solid',
              borderColor: LEGACY_BORDER,
              borderRadius: '[16px]',
              p: { base: '500', md: '800' },
              mb: '600',
            })}
          >
            <h2 className={css({ fontSize: '[24px]', lineHeight: '[32px]', fontWeight: '600', color: LEGACY_DARK })}>
              Listing completeness
            </h2>
            <p className={css({ fontSize: '[14px]', lineHeight: '[18px]', color: LEGACY_GRAY, mt: '300' })}>
              Complete the recommended actions to help increase the attention your listing gets
              from potenitial buyers.{' '}
              <span className={css({ color: LEGACY_BLUE, textDecoration: 'underline' })}>
                How does this work?
              </span>
            </p>

            <p
              className={css({
                fontSize: '[16px]',
                lineHeight: '[24px]',
                fontWeight: '600',
                color: LEGACY_DARK,
                mt: '600',
              })}
            >
              88% complete (8 of 11)
            </p>
            <div
              className={css({
                h: '18px',
                bg: LEGACY_BORDER,
                borderRadius: '[18px]',
                overflow: 'hidden',
                mt: '300',
              })}
            >
              <div className={css({ h: '100%', w: '[83.33%]', bg: '[#2bb673]' })} />
            </div>

            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                xs: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
                gap: '200',
                mt: '700',
                mb: '400',
              })}
            >
              <div className={hstack({ gap: '200', alignItems: 'center' })}>
                <span className={css({ fontSize: '[16px]', lineHeight: '[24px]', fontWeight: '600', color: LEGACY_DARK })}>
                  Recommended (3)
                </span>
                <IconChevronUp size={2} />
              </div>
              <span className={css({ fontSize: '[14px]', color: LEGACY_GRAY })}>
                Any changes made in MLS will take ~15 min to appear
              </span>
            </div>

            <div className={vstack({ alignItems: 'stretch', gap: '400' })}>
              {LEGACY_RECOMMENDATIONS.map((rec) => (
                <div
                  key={rec.title}
                  className={css({
                    borderWidth: '100',
                    borderStyle: 'solid',
                    borderColor: LEGACY_INPUT_BORDER,
                    borderRadius: '200',
                    p: '500',
                  })}
                >
                  <div
                    className={hstack({
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '200',
                    })}
                  >
                    <span className={css({ fontSize: '[16px]', lineHeight: '[24px]', fontWeight: '500', color: LEGACY_DARK })}>
                      {rec.title}
                    </span>
                    <div className={hstack({ gap: '400', alignItems: 'center', flexWrap: 'wrap' })}>
                      {rec.actions.map((action) => (
                        <span
                          key={action}
                          className={css({
                            fontSize: '[16px]',
                            lineHeight: '[24px]',
                            fontWeight: '500',
                            color: LEGACY_BLUE,
                            textDecoration: 'underline',
                            whiteSpace: 'nowrap',
                          })}
                        >
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className={hstack({
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      flexWrap: 'wrap',
                      gap: '200',
                      mt: '200',
                    })}
                  >
                    <span className={css({ fontSize: '[14px]', color: LEGACY_GRAY })}>
                      {rec.description}
                    </span>
                    <span className={css({ fontSize: '[14px]', color: LEGACY_GRAY, whiteSpace: 'nowrap' })}>
                      {rec.lift}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className={hstack({ gap: '200', alignItems: 'center', mt: '600' })}>
              <span className={css({ fontSize: '[16px]', lineHeight: '[24px]', fontWeight: '600', color: LEGACY_DARK })}>
                Completed (8)
              </span>
              <IconChevronDown size={2} />
            </div>
          </div>

          {/* Listing details and photos card */}
          <div
            className={css({
              bg: 'white',
              borderWidth: '100',
              borderStyle: 'solid',
              borderColor: LEGACY_BORDER,
              borderRadius: '[16px]',
              p: { base: '500', md: '800' },
            })}
          >
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                xs: { flexDirection: 'row', justifyContent: 'space-between' },
                gap: '400',
              })}
            >
              <div>
                <h2 className={css({ fontSize: '[24px]', lineHeight: '[32px]', fontWeight: '600', color: LEGACY_DARK })}>
                  Listing details and photos
                </h2>
                <p className={css({ fontSize: '[14px]', lineHeight: '[20px]', color: LEGACY_GRAY, mt: '300', maxW: '600px' })}>
                  This information is pulled in automatically from your MLS and any edits will
                  show up only on your listing on our site.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowEditModal(true)}
                className={css({
                  borderWidth: '200',
                  borderStyle: 'solid',
                  borderColor: LEGACY_BLUE,
                  color: LEGACY_BLUE,
                  bg: 'white',
                  fontWeight: '500',
                  fontSize: '[14px]',
                  borderRadius: '200',
                  px: '600',
                  py: '300',
                  cursor: 'pointer',
                  flexShrink: 0,
                })}
              >
                Edit
              </button>
            </div>

            {/* Description */}
            <div className={vstack({ alignItems: 'flex-start', gap: '300', mt: '700' })}>
              <div className={hstack({ gap: '300', alignItems: 'center' })}>
                <IconClipboard size={3} />
                <span className={css({ fontSize: '[16px]', lineHeight: '[24px]', fontWeight: '600', color: LEGACY_DARK })}>
                  Description
                </span>
              </div>
              <p className={css({ fontSize: '[16px]', lineHeight: '[24px]', color: LEGACY_GRAY, maxW: '900px' })}>
                Beautiful, loved, well-maintained 3-bedroom 2.5 bathroom South Austin home on
                .23480 of an acre lot! Spacious open floor plan with numerous upgrades...{' '}
                <span className={css({ color: LEGACY_BLUE, textDecoration: 'underline' })}>
                  Show more
                </span>
              </p>
              <div className={hstack({ gap: '700', flexWrap: 'wrap' })}>
                {LEGACY_PROPERTY_FACTS.map((fact) => (
                  <div key={fact.label} className={vstack({ alignItems: 'flex-start', gap: '0' })}>
                    <span className={css({ fontSize: '[16px]', lineHeight: '[22px]', fontWeight: '500', color: LEGACY_DARK })}>
                      {fact.value}
                    </span>
                    <span className={css({ fontSize: '[16px]', lineHeight: '[22px]', color: LEGACY_GRAY })}>
                      {fact.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brokerage link */}
            <div className={vstack({ alignItems: 'flex-start', gap: '300', mt: '700' })}>
              <div className={hstack({ gap: '300', alignItems: 'center' })}>
                <IconLink size={3} />
                <span className={css({ fontSize: '[16px]', lineHeight: '[24px]', fontWeight: '600', color: LEGACY_DARK })}>
                  Brokerage link
                </span>
              </div>
              <span className={css({ fontSize: '[16px]', lineHeight: '[24px]', color: LEGACY_BLUE, textDecoration: 'underline' })}>
                http://austinsouthwest.kwoffice.com
              </span>
            </div>

            {/* Tour */}
            <div className={vstack({ alignItems: 'flex-start', gap: '300', mt: '700' })}>
              <div className={hstack({ gap: '300', alignItems: 'center' })}>
                <IconPlay size={3} />
                <span className={css({ fontSize: '[16px]', lineHeight: '[24px]', fontWeight: '600', color: LEGACY_DARK })}>
                  3D, Video, or Virtual Tour
                </span>
              </div>
              <span className={css({ fontSize: '[16px]', lineHeight: '[24px]', color: LEGACY_BLUE, textDecoration: 'underline' })}>
                http://tour.kwarealty.com/123-Main-Street-Austin-YX-78701/
              </span>
            </div>

            {/* Open houses */}
            <div className={vstack({ alignItems: 'flex-start', gap: '300', mt: '700' })}>
              <div className={hstack({ gap: '300', alignItems: 'center' })}>
                <IconOpenHouse size={3} />
                <span className={css({ fontSize: '[16px]', lineHeight: '[24px]', fontWeight: '600', color: LEGACY_DARK })}>
                  Open houses (2)
                </span>
              </div>
              <span className={css({ fontSize: '[16px]', lineHeight: '[24px]', color: LEGACY_GRAY })}>
                Saturday, Oct 15, 2022  11am-5pm
              </span>
              <span className={css({ fontSize: '[16px]', lineHeight: '[24px]', color: LEGACY_GRAY })}>
                Sunday, Oct 16, 2022  11am-5pm
              </span>
            </div>

            {/* Photos */}
            <div className={vstack({ alignItems: 'flex-start', gap: '300', mt: '700' })}>
              <div className={hstack({ gap: '300', alignItems: 'center' })}>
                <IconPhotos size={3} />
                <span className={css({ fontSize: '[16px]', lineHeight: '[24px]', fontWeight: '600', color: LEGACY_DARK })}>
                  Photos (10)
                </span>
              </div>
              <span className={css({ fontSize: '[16px]', lineHeight: '[24px]', color: LEGACY_GRAY })}>
                Current photo source: Team upload
              </span>
              <div className={css({ w: '100%', mt: '300' })}>
                <LegacyPhotoBanner />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EnhancedMediaEmailPreview() {
  const [showListingDetail, setShowListingDetail] = useState(false)

  if (showListingDetail) {
    return <LegacyListingDetailPage onBack={() => setShowListingDetail(false)} />
  }

  return (
    <div
      className={css({
        h: '100dvh',
        w: '100%',
        bg: 'bg.base',
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <div
        className={css({
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        })}
      >
        {/* Inbox toolbar */}
        <div
          className={hstack({
            justifyContent: 'space-between',
            alignItems: 'center',
            px: '600',
            py: '400',
            borderBottomWidth: '100',
            borderBottomStyle: 'solid',
            borderColor: 'border.base',
            flexShrink: 0,
          })}
        >
          <span className={css({ textStyle: 'headingSm', color: 'text.base' })}>Inbox</span>
          <span className={css({ textStyle: 'bodySm', color: 'text.alternate' })}>
            user.name@email.com
          </span>
        </div>

        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            md: { flexDirection: 'row' },
            alignItems: 'stretch',
            flex: '1',
            overflow: 'hidden',
          })}
        >
          {/* Message list */}
          <div
            className={css({
              w: { base: '100%', md: '320px' },
              maxH: { base: '200px', md: 'none' },
              flexShrink: 0,
              overflowY: 'auto',
              borderRightWidth: { base: '0', md: '100' },
              borderRightStyle: 'solid',
              borderBottomWidth: { base: '100', md: '0' },
              borderBottomStyle: 'solid',
              borderColor: 'border.base',
            })}
          >
            {INBOX_MESSAGES.map((msg) => {
              const active = msg.id === 'enhanced-media'
              return (
                <div
                  key={msg.id}
                  className={css({
                    px: '500',
                    py: '400',
                    borderBottomWidth: '100',
                    borderBottomStyle: 'solid',
                    borderColor: 'border.base',
                    bg: active ? 'bg.alternate' : 'bg.base',
                  })}
                >
                  <div className={hstack({ justifyContent: 'space-between', alignItems: 'center' })}>
                    <span
                      className={css({
                        textStyle: 'bodySm',
                        fontWeight: active ? 'bold' : 'medium',
                        color: 'text.base',
                      })}
                    >
                      {msg.sender}
                    </span>
                    <span className={css({ textStyle: 'caption', color: 'text.alternate' })}>
                      {msg.time}
                    </span>
                  </div>
                  <p
                    className={css({
                      textStyle: 'bodySm',
                      fontWeight: active ? 'medium' : 'normal',
                      color: 'text.base',
                      mt: '100',
                    })}
                  >
                    {msg.subject}
                  </p>
                  <p
                    className={css({
                      textStyle: 'caption',
                      color: 'text.alternate',
                      mt: '100',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    })}
                  >
                    {msg.snippet}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Reading pane */}
          <div className={css({ flex: '1', overflowY: 'auto' })}>
            {/* Message header */}
            <div
              className={vstack({
                alignItems: 'flex-start',
                gap: '300',
                px: { base: '400', md: '700' },
                py: '600',
                borderBottomWidth: '100',
                borderBottomStyle: 'solid',
                borderColor: 'border.base',
              })}
            >
              <h2 className={css({ textStyle: 'headingSm', color: 'text.base' })}>
                Your listing now has enhanced media
              </h2>
              <div className={hstack({ gap: '300', alignItems: 'center' })}>
                <Avatar size="xs" initials="RP" />
                <div className={vstack({ alignItems: 'flex-start', gap: '0' })}>
                  <span
                    className={css({ textStyle: 'bodySm', fontWeight: 'medium', color: 'text.base' })}
                  >
                    realtor.com PRO
                  </span>
                  <span className={css({ textStyle: 'caption', color: 'text.alternate' })}>
                    to user.name@email.com
                  </span>
                </div>
                <span
                  className={css({ textStyle: 'caption', color: 'text.alternate', ml: 'auto' })}
                >
                  9:41 AM
                </span>
              </div>
            </div>

            {/* Email content — clicking anywhere opens the listing detail page */}
            <div
              onClick={() => setShowListingDetail(true)}
              className={css({ cursor: 'pointer' })}
            >
            {/* Email body — constrained to the original design width, centered in the pane */}
            <div className={vstack({ alignItems: 'center', w: '100%' })}>
            <div className={css({ w: '100%', maxW: '600px' })}>
            <div
              className={vstack({
                alignItems: 'center',
                gap: '700',
                px: { base: '400', md: '700' },
                py: { base: '700', md: '1400' },
              })}
            >
          <LogoRealtorProDefault className={css({ h: '32px', display: 'block' })} />

          <div className={vstack({ alignItems: 'flex-start', gap: '500', w: '100%' })}>
            <h1
              className={css({
                textStyle: 'headingLg',
                fontWeight: 'bold',
                color: 'text.base',
              })}
            >
              Enhanced media has been added to your listing
            </h1>

            <div className={vstack({ alignItems: 'flex-start', gap: '400' })}>
              <p className={css({ textStyle: 'bodyLg', color: 'text.base' })}>[Agent name],</p>
              <p className={css({ textStyle: 'bodyLg', color: 'text.base' })}>
                Your team has added enhanced media to [Listing address]. Buyers will now see
                these photos on the listing.
              </p>
              <p className={css({ textStyle: 'bodyLg', color: 'text.base' })}>
                Since your team manages this listing's media, any future photo changes need to
                go through them directly.
              </p>
            </div>

            <button
              type="button"
              className={css({
                w: '100%',
                bg: 'status.error',
                color: 'text.inverse',
                textStyle: 'bodyMd',
                fontWeight: 'bold',
                borderRadius: '500',
                py: '500',
                textAlign: 'center',
                cursor: 'pointer',
                border: 'none',
              })}
            >
              View your listing
            </button>
          </div>
        </div>
            </div>
            </div>

        {/* Footer — full-bleed background, content constrained to the design width */}
        <div
          className={vstack({
            alignItems: 'center',
            gap: '500',
            bg: 'bg.inverse',
            color: 'text.inverse',
            w: '100%',
            px: { base: '400', md: '700' },
            py: { base: '600', md: '900' },
          })}
        >
          <div className={vstack({ alignItems: 'center', gap: '500', w: '100%', maxW: '600px' })}>
          <LogoBrandWhite className={css({ h: '24px', display: 'block' })} />
          <span className={css({ textStyle: 'bodySm', fontWeight: 'bold' })}>
            #1 site real estate professionals trust
          </span>

          <div className={vstack({ alignItems: 'center', gap: '300', mt: '400' })}>
            <span className={css({ textStyle: 'bodySm' })}>901 E 6th St, Austin, TX 78702</span>
            <div className={hstack({ gap: '300', flexWrap: 'wrap', justifyContent: 'center' })}>
              <span className={css({ textStyle: 'bodySm', textDecoration: 'underline' })}>
                Terms of Use
              </span>
              <span className={css({ textStyle: 'bodySm' })}>|</span>
              <span className={css({ textStyle: 'bodySm', textDecoration: 'underline' })}>
                Privacy
              </span>
              <span className={css({ textStyle: 'bodySm' })}>|</span>
              <span className={css({ textStyle: 'bodySm', textDecoration: 'underline' })}>
                Equal Housing
              </span>
            </div>
          </div>

          <p
            className={css({
              textStyle: 'caption',
              fontStyle: 'italic',
              textAlign: 'center',
              mt: '400',
            })}
          >
            To unsubscribe from transactional emails, you must cancel your subscription.
          </p>

          <p className={css({ textStyle: 'caption', textAlign: 'center' })}>
            Move Sales, Inc. does not use any National Association of REALTORS dues to operate
            and maintain Realtor.com©.
          </p>

          <p className={css({ textStyle: 'caption', textAlign: 'center' })}>
            REALTOR® and Realtor.com® are trademarks of the NATIONAL ASSOCIATION OF REALTORS®
            <br />
            and are used with its permission. © 2025 Move, Inc. All rights reserved.
          </p>
        </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Shell ──────────────────────────────────────────────────────────────────────

type View =
  | { page: 'list' }
  | { page: 'detail'; listingId: string }
  | { page: 'photo-upload'; listingId: string }
  | { page: 'promote-listings' }

export default function Shell() {
  const [listings, setListings] = useState<Listing[]>(LISTINGS)
  const [view, setView] = useState<View>({ page: 'list' })
  const [promoteTargets, setPromoteTargets] = useState<Listing[] | null>(null)
  const [toastListingId, setToastListingId] = useState<string | null>(null)
  const [showSaveConsent, setShowSaveConsent] = useState(false)
  const [pendingPhotos, setPendingPhotos] = useState<string[]>([])
  const [experience, setExperience] = useState<Experience>('team')
  const [navPanelOpen, setNavPanelOpen] = useState(false)
  const [sidebarPage, setSidebarPage] = useState<SidebarPage>('all-listings')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const handleSidebarNavigate = (page: SidebarPage) => {
    setSidebarPage(page)
    if (page === 'all-listings') setView({ page: 'list' })
  }

  const handleResetPrototype = () => {
    setListings(LISTINGS)
    setView({ page: 'list' })
    setPromoteTargets(null)
    setToastListingId(null)
    setShowSaveConsent(false)
    setPendingPhotos([])
    setSidebarPage('all-listings')
    setExperience('team')
    setNavPanelOpen(false)
    setMobileNavOpen(false)
  }

  const selectedListing =
    view.page === 'detail' || view.page === 'photo-upload'
      ? listings.find((l) => l.id === view.listingId)
      : undefined

  const handleConfirmPromote = () => {
    if (promoteTargets && promoteTargets.length > 0) {
      const promotedIds = promoteTargets.map((l) => l.id)
      setListings((prev) =>
        prev.map((l) =>
          promotedIds.includes(l.id) ? { ...l, promoted: true, promotionStatus: 'Promoted' } : l
        )
      )
      if (promotedIds.length === 1) {
        setView({ page: 'detail', listingId: promotedIds[0] })
        setToastListingId(promotedIds[0])
      } else {
        setView({ page: 'list' })
      }
    }
    setPromoteTargets(null)
  }

  const showSidebar = view.page !== 'photo-upload'

  const handleSelectExperience = (next: Experience) => {
    setExperience(next)
    if (next === 'team') setView({ page: 'list' })
    setNavPanelOpen(false)
  }

  if (experience !== 'team') {
    return (
      <div className={css({ minW: '320px', minH: '100dvh', bg: 'bg.base' })}>
        {experience === 'agent' ? (
          <EnhancedMediaEmailPreview />
        ) : (
          <>
            <TopBar />
            <PlaceholderExperience
              label={EXPERIENCES.find((exp) => exp.id === experience)?.label ?? ''}
            />
          </>
        )}
        <ExperienceNavTrigger onClick={() => setNavPanelOpen(true)} />
        <ExperienceNavPanel
          open={navPanelOpen}
          experience={experience}
          onClose={() => setNavPanelOpen(false)}
          onSelect={handleSelectExperience}
          onReset={handleResetPrototype}
        />
      </div>
    )
  }

  return (
    <div className={css({ minW: '320px', minH: '100dvh', bg: 'bg.base' })}>
      <TopBar onMenuClick={showSidebar ? () => setMobileNavOpen(true) : undefined} />
      {showSidebar && (
        <>
          <Sidebar
            activePage={view.page === 'list' ? 'all-listings' : sidebarPage}
            onNavigate={handleSidebarNavigate}
          />
          <MobileSidebarDrawer
            open={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
            activePage={view.page === 'list' ? 'all-listings' : sidebarPage}
            onNavigate={handleSidebarNavigate}
          />
        </>
      )}
      <main
        className={css({
          pt: HEADER_HEIGHT,
          ml: '0',
          md: { ml: showSidebar ? SIDEBAR_WIDTH : '0' },
        })}
      >
        {view.page === 'photo-upload' && selectedListing ? (
          <PhotoUploadScreen
            listing={selectedListing}
            onBack={() => setView({ page: 'detail', listingId: selectedListing.id })}
            onSave={(photos) => {
              const hasNewPhotos = photos.some((p) => !selectedListing.uploadedPhotos.includes(p))
              if (hasNewPhotos) {
                setPendingPhotos(photos)
                setShowSaveConsent(true)
              } else {
                const targetId = selectedListing.id
                setListings((prev) =>
                  prev.map((l) => (l.id === targetId ? { ...l, uploadedPhotos: photos } : l))
                )
                setView({ page: 'detail', listingId: targetId })
              }
            }}
          />
        ) : (
          <div
            className={css({
              maxW: '1140px',
              mx: 'auto',
              px: { base: '400', sm: '600', md: '700' },
              py: { base: '500', md: '700' },
            })}
          >
            {view.page === 'list' && (
              <AllListingsScreen
                listings={listings}
                onSelectListing={(id) => setView({ page: 'detail', listingId: id })}
                onPromote={(listing) => setPromoteTargets([listing])}
                onOpenPromoteListings={() => setView({ page: 'promote-listings' })}
                onEnhance={(listing) => setView({ page: 'photo-upload', listingId: listing.id })}
              />
            )}
            {view.page === 'promote-listings' && (
              <PromoteListingsScreen
                listings={listings}
                onBack={() => setView({ page: 'list' })}
                onSelectListing={(id) => setView({ page: 'detail', listingId: id })}
                onRequestPromote={(selectedListings) => setPromoteTargets(selectedListings)}
              />
            )}
            {view.page === 'detail' && selectedListing && (
              <ListingDetailScreen
                listing={selectedListing}
                onBack={() => setView({ page: 'list' })}
                onPromote={(listing) => setPromoteTargets([listing])}
                onEnhance={(listing) => setView({ page: 'photo-upload', listingId: listing.id })}
              />
            )}
          </div>
        )}
      </main>

      <PromoteModal
        listings={promoteTargets}
        onClose={() => setPromoteTargets(null)}
        onConfirm={handleConfirmPromote}
      />

      <SaveImagesModal
        open={showSaveConsent}
        onClose={() => setShowSaveConsent(false)}
        onDeny={() => setShowSaveConsent(false)}
        onConfirm={() => {
          setShowSaveConsent(false)
          if (selectedListing) {
            const targetId = selectedListing.id
            setListings((prev) =>
              prev.map((l) =>
                l.id === targetId ? { ...l, uploadedPhotos: pendingPhotos, mediaEnhanced: true } : l
              )
            )
            setView({ page: 'detail', listingId: targetId })
          }
        }}
      />

      <Toast
        show={!!toastListingId}
        onClose={() => setToastListingId(null)}
        status="success"
        title="Your listing has been promoted and will begin later today."
      />

      <ExperienceNavTrigger onClick={() => setNavPanelOpen(true)} />
      <ExperienceNavPanel
        open={navPanelOpen}
        experience={experience}
        onClose={() => setNavPanelOpen(false)}
        onSelect={handleSelectExperience}
        onReset={handleResetPrototype}
      />
    </div>
  )
}
