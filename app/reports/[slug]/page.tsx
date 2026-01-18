import { promises as fs } from "fs"
import { join } from "path"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText } from "lucide-react"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

function sanitizeSlug(slug: string): boolean {
  // ディレクトリトラバーサル対策
  // / や .. が含まれるものは弾く
  if (slug.includes("/") || slug.includes("..") || slug.includes("\\")) {
    return false
  }
  
  // ファイル名として有効な文字のみ許可
  if (!/^[a-zA-Z0-9\-_\.]+$/.test(slug)) {
    return false
  }
  
  return true
}

async function getReportContent(slug: string): Promise<{ content: string; filename: string } | null> {
  // セキュリティチェック
  if (!sanitizeSlug(slug)) {
    return null
  }
  
  try {
    const reportsDir = join(process.cwd(), "reports")
    const filePath = join(reportsDir, `${slug}.md`)
    
    // ファイルの存在確認
    try {
      await fs.access(filePath)
    } catch {
      return null
    }
    
    const content = await fs.readFile(filePath, "utf-8")
    
    return {
      content,
      filename: `${slug}.md`,
    }
  } catch (error) {
    console.error("Error reading report file:", error)
    return null
  }
}

export default async function ReportDetailPage({ params }: PageProps) {
  const { slug } = await params
  
  const report = await getReportContent(slug)
  
  if (!report) {
    notFound()
  }
  
  // ファイル名から日付とグループを抽出
  const match = report.filename.match(/^(\d{4}-\d{2}-\d{2})_group(\d+)\.md$/)
  const date = match ? match[1] : "不明"
  const group = match ? `group${match[2]}` : "不明"
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/reports" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            一覧に戻る
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            レポート詳細
          </h1>
          <p className="text-muted-foreground mt-2">
            {date} - {group}
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {report.filename}
          </CardTitle>
          <CardDescription>
            {date} に生成された {group} のレポート
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: 後から react-markdown に置き換え可能な構造 */}
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap break-words bg-muted p-4 rounded-lg border text-sm font-mono overflow-x-auto">
              {report.content}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


