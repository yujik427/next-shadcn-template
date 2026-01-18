import { promises as fs } from "fs"
import { join } from "path"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

interface ReportFile {
  filename: string
  slug: string
  date: string
  group: string
}

function parseFilename(filename: string): { date: string; group: string } | null {
  // YYYY-MM-DD_groupX.md の形式をパース
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})_group(\d+)\.md$/)
  if (!match) return null
  
  return {
    date: match[1],
    group: `group${match[2]}`,
  }
}

async function getReports(): Promise<ReportFile[]> {
  try {
    const reportsDir = join(process.cwd(), "reports")
    
    // ディレクトリの存在確認
    try {
      await fs.access(reportsDir)
    } catch {
      // ディレクトリが存在しない場合は空配列を返す
      return []
    }
    
    const files = await fs.readdir(reportsDir)
    
    const reports: ReportFile[] = []
    
    for (const file of files) {
      if (!file.endsWith(".md")) continue
      
      const parsed = parseFilename(file)
      if (!parsed) continue
      
      reports.push({
        filename: file,
        slug: file.replace(/\.md$/, ""),
        date: parsed.date,
        group: parsed.group,
      })
    }
    
    // 日付でソート（新しいものが上）
    reports.sort((a, b) => b.date.localeCompare(a.date))
    
    return reports
  } catch (error) {
    console.error("Error reading reports directory:", error)
    return []
  }
}

export default async function ReportsPage() {
  const reports = await getReports()
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          OTCリサーチレポート
        </h1>
        <p className="text-muted-foreground mt-2">
          日次で生成されるリサーチレポートの一覧です。
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            レポート一覧
          </CardTitle>
          <CardDescription>
            {reports.length === 0
              ? "まだレポートがありません"
              : `${reports.length}件のレポート`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>まだレポートがありません。</p>
              <p className="text-sm mt-2">
                Python側でレポートが生成されると、ここに表示されます。
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>日付</TableHead>
                  <TableHead>グループ</TableHead>
                  <TableHead>ファイル名</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.slug}>
                    <TableCell className="font-medium">{report.date}</TableCell>
                    <TableCell>{report.group}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {report.filename}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/reports/${report.slug}`}>閲覧</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


