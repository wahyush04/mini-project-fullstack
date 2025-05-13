
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Filter, Search, Eye } from "lucide-react";
import { useLog } from '../../hooks/useLog';
import type { LogModel } from "../../types/model/logs.type";
import { useNavigate } from "react-router-dom";


const AdminReportsTab = () => {
  const [logs, setLogs] = useState<LogModel[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogModel[]>([]);
  const [usernameFilter, setUsernameFilter] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleViewUserDetail = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  const {
    logData,
    isLoading,
    isError,
    errorMessage,
    status
  } = useLog();

  useEffect(() => {
    if (logData) {
      setLogs(logData.data);
      setFilteredLogs(logData.data);
    }
  }, [logData]);

  useEffect(() => {
    if (usernameFilter.trim() === "") {
      setFilteredLogs(logs);
    } else {
      const filtered = logs.filter(log =>
        log.username.toLowerCase().includes(usernameFilter.toLowerCase())
      );
      setFilteredLogs(filtered);
    }
  }, [logs, usernameFilter]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Completions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(logs.map(log => log.userId)).size}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(logs.map(log => log.code)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Logs Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>User Course Completion Logs</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={toggleFilter}>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showFilter && (
            <div className="mb-4 flex flex-col sm:flex-row gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Filter by username..."
                  className="pl-8"
                  value={usernameFilter}
                  onChange={(e) => setUsernameFilter(e.target.value)}
                />
              </div>
            </div>
          )}

          {filteredLogs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">No</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Point</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log, index) => (
                  <TableRow key={log.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{log.username}</TableCell>
                    <TableCell>{log.description}</TableCell>
                    <TableCell>{log.data.point}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${log.code === "COMPLETE_TRYOUT_SECTION" ? "bg-green-100 text-green-800" :
                        log.code === "COMPLETE_COURSE" ? "bg-yellow-100 text-yellow-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                        {log.code}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewUserDetail(log.userId)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              No user logs found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReportsTab;
