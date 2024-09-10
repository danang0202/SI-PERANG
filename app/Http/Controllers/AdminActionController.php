<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\JenisBarang;
use App\Models\Pengajuan;
use App\Models\SatuanBarang;
use App\Models\TimKerja;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminActionController extends Controller
{

    public function saveBarangAction(Request $request, $id = null)
    {
        $request->validate([
            'kode' => [
                'required',
                'digits:16',
                Rule::unique('barang', 'kode')->ignore($id),
            ],
            'nama' => 'required|string|max:255',
            'jenisBarangId' => 'required|exists:siperang_jenis_barang,id',
            'satuanId' => 'required|exists:siperang_satuan_barang,id',
            'jumlah' => 'required|integer|min:1',
        ]);

        try {
            $barang = $id ? Barang::findOrFail($id) : new Barang();
            $barang->kode = $request->input('kode');
            $barang->nama = strtoupper($request->input('nama'));
            $barang->jenis_barang_id = intval($request->input('jenisBarangId'));
            $barang->satuan_id = intval($request->input('satuanId'));
            $barang->jumlah = $request->input('jumlah');
            $barang->save();
            $action = $id ? 'diperbarui' : 'ditambahkan';
            $status = [
                'type' => 'success',
                'message' => "Barang {$barang->nama} berhasil {$action}!"
            ];

            return redirect()->route('admin.inventaris-barang')
                ->with('status', $status);
        } catch (\Exception $e) {
            $action = $id ? 'memperbarui' : 'menambahkan';
            $status = [
                'type' => 'fail',
                'message' => "Gagal {$action} barang. Terjadi kesalahan."
            ];

            return redirect()->route(
                $id ? 'admin.inventaris-barang.update' : 'admin.inventaris-barang.create',
                $id ? ['id' => $id] : []
            )->with('status', $status);
        }
    }

    public function deleteBarangAction($id)
    {
        try {
            $barang =  Barang::findOrFail($id);
            $barang->delete();
            $status = [
                'type' => 'success',
                'message' => 'Barang "' . $barang->nama . '" berhasil dihapus!'
            ];
            return redirect()->route('admin.inventaris-barang')
                ->with('status', $status);
        } catch (\Throwable $th) {
            $status = [
                'type' => $barang ? 'fail' : 'success',
                'message' => $barang
                    ? 'Jenis barang "' . $barang->nama . '" tidak dapat dihapus!'
                    : 'Barang tidak terhapus!',
            ];
            return redirect()->route('admin.inventaris-barang')
                ->with('status', $status);
        }
    }

    public function tambahStockAction(Request $request, $id)
    {
        try {
            $request->validate([
                'stock' => 'required|integer'
            ]);

            $barang =  Barang::findOrFail($id);
            $barang->jumlah += $request->input('stock');
            $barang->save();
            $status = [
                'type' => 'success',
                'message' => 'Stock barang "' . $barang->nama . '" berhasil ditambah!'
            ];

            return redirect()->route('admin.inventaris-barang')
                ->with('status', $status);
        } catch (\Throwable $th) {
            $status = [
                'type' => 'fail',
                'message' => 'Stock barang gagal ditambahkan!'
            ];
            return redirect()->route('admin.inventaris-barang')
                ->with('status', $status);
        }
    }
    // Jenis Barang

    public function saveJenisBarangAction(Request $request, $id = null)
    {
        $request->validate([
            'kode' => [
                'required',
                'digits:10',
                Rule::unique('jenis_barang')->ignore($id),
            ],
            'nama' => 'required|string|max:255',
        ]);
        $data = $request->only(['kode', 'nama']);

        $jenisBarang = $id ? JenisBarang::findOrFail($id) : new JenisBarang();
        $jenisBarang->fill($data)->save();

        $action = $id ? 'diperbarui' : 'ditambahkan';
        $status = [
            'type' => 'success',
            'message' => 'Jenis barang "' . $jenisBarang->nama . '" berhasil ' . $action . '!'
        ];

        return redirect()->route('admin.inventaris-barang.jenis')
            ->with('status', $status);
    }


    public function deleteJenisBarangAction($id)
    {
        $jenisBarang = JenisBarang::findOrFail($id);
        $isUsed = $jenisBarang->barang()->exists();
        if ($isUsed) {
            $status = [
                'type' => 'fail',
                'message' => 'Jenis barang"' . $jenisBarang->nama . '" tidak dapat dihapus karena sedang digunakan!'
            ];

            return redirect()->route('admin.inventaris-barang.jenis')
                ->with('status', $status);
        }
        $jenisBarang->delete();
        $status = [
            'type' => 'success',
            'message' => 'Jenis barang "' . $jenisBarang->nama . '" berhasil dihapus!'
        ];
        return redirect()->route('admin.inventaris-barang.jenis')
            ->with('status', $status);
    }

    //  Satuan Barang
    public function createSatuanBarangAction(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        try {
            $satuanBarang = new SatuanBarang();
            $satuanBarang->nama = strtoupper($request->input('nama'));
            $satuanBarang->save();

            $status = [
                'type' => 'success',
                'message' => 'Satuan barang ' . $satuanBarang->nama . ' berhasil ditambahkan!'
            ];

            return redirect()->route('admin.inventaris-barang.satuan')
                ->with('status', $status);
        } catch (\Exception $e) {
            $status = [
                'type' => 'fail',
                'message' => 'Gagal menambahkan satuan barang ' . $satuanBarang->nama . '. Nama sudah digunakan.'
            ];
            return redirect()->route('admin.inventaris-barang.satuan.create')
                ->with('status', $status);
        }
    }


    public function updateSatuanBarangAction(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
        ]);
        try {
            $satuanBarang = SatuanBarang::findOrFail($id);
            $satuanBarang->nama = strtoupper($request->input('nama'));
            $satuanBarang->save();

            $status = [
                'type' => 'success',
                'message' => 'Satuan barang ' . $satuanBarang->nama . ' berhasil ditambahkan!'
            ];

            return redirect()->route('admin.inventaris-barang.satuan')
                ->with('status', $status);
        } catch (\Exception $e) {
            $status = [
                'type' => 'fail',
                'message' => 'Gagal menambahkan satuan barang ' . $satuanBarang->nama . '. Nama sudah digunakan.'
            ];
            return redirect()->route('admin.inventaris-barang.satuan.create')
                ->with('status', $status);
        }
    }

    public function deleteSatuanBarangAction($id)
    {
        $satuanBarang = SatuanBarang::findOrFail($id);

        $isUsed = $satuanBarang->barang()->exists();
        if ($isUsed) {
            $status = [
                'type' => 'fail',
                'message' => 'Satuan barang"' . $satuanBarang->nama . '" tidak dapat dihapus karena sedang digunakan!'
            ];

            return redirect()->route('admin.inventaris-barang.satuan')
                ->with('status', $status);
        }

        $satuanBarang->delete();

        $status = [
            'type' => 'success',
            'message' => 'Satuan barang "' . $satuanBarang->nama . '" berhasil dihapus!'
        ];

        return redirect()->route('admin.inventaris-barang.satuan')
            ->with('status', $status);
    }

    public function terimaPengajuanAction(Request $request, $id)
    {
        try {
            $pengajuan = Pengajuan::findOrFail($id);

            if ($pengajuan->status == 'MENUNGGU KONFIRMASI') {
                $tahun = now()->year;
                $lastPengajuan = Pengajuan::whereYear('created_at', $tahun)
                    ->whereNotNull('no_pengajuan')
                    ->orderBy('no_pengajuan', 'desc')
                    ->first();
                if ($lastPengajuan) {
                    $lastNumber = (int) substr($lastPengajuan->no_pengajuan, 2, 3);
                    $nextNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
                } else {
                    if ($tahun == 2024) {
                        $lastPengajuan = env('LAST_REQUEST_2024', 0);
                        $nextNumber = str_pad($lastPengajuan + 1, 3, '0', STR_PAD_LEFT);
                    } else {
                        $nextNumber = '001';
                    }
                }

                $noPengajuan = "B-" . $nextNumber . "/34021/PL615/" . $tahun;
                $pengajuan->status = 'PERMINTAAN DITERIMA';
                $pengajuan->no_pengajuan = $noPengajuan;
                $pengajuan->save();

                $status = [
                    'type' => 'success',
                    'message' => 'Permintaan telah diterima dengan nomor Permintaan: ' . $noPengajuan
                ];
            } else {
                throw new \Exception('Permintaan hanya bisa diterima jika berstatus "MENUNGGU KONFIRMASI".');
            }
        } catch (\Exception $e) {
            $status = [
                'type' => 'fail',
                'message' => 'Terjadi kesalahan saat menerima Permintaan: ' . $e->getMessage()
            ];
        }
        return redirect()->back()->with('status', $status);
    }

    public function tolakPengajuanAction(Request $request, $id)
    {
        try {
            $pengajuan = Pengajuan::findOrFail($id);
            if ($pengajuan->status == 'MENUNGGU KONFIRMASI') {
                $pengajuan->status = 'PERMINTAAN DITOLAK';
                $pengajuan->save();
                $status = [
                    'type' => 'success',
                    'message' => 'Permintaan telah ditolak.'
                ];
            } else {
                throw new \Exception('Permintaan hanya bisa ditolak jika berstatus "MENUNGGU KONFIRMASI".');
            }
        } catch (\Exception $e) {
            $status = [
                'type' => 'fail',
                'message' => 'Terjadi kesalahan saat menolak Permintaan: ' . $e->getMessage()
            ];
        }
        return redirect()->back()->with('status', $status);
    }

    // User

    public function createUserAction(Request $request)
    {
        // Validasi data yang masuk
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'nip' => 'required|string|size:18|unique:users',
            'role' => 'required|in:ADMIN,USER',
            'password' => 'required|string|min:8',
            'timKerjaId' => 'required|array',
            'timKerjaId.*' => 'exists:siperang_tim_kerja,id',
        ], [
            'username.unique' => 'Username sudah terdaftar.',
            'nip.unique' => 'NIP sudah terdaftar.',
        ]);

        DB::beginTransaction();

        try {
            $user = User::create([
                'nama' => $validatedData['nama'],
                'username' => $validatedData['username'],
                'nip' => $validatedData['nip'],
                'role' => $validatedData['role'],
                'password' => Hash::make($validatedData['password']),
            ]);
            if (isset($validatedData['timKerjaId'])) {
                $user->timKerjas()->attach($validatedData['timKerjaId']);
            }
            DB::commit();
            $status = [
                'type' => 'success',
                'message' => 'User ' . $user->nama . ' berhasil ditambahkan!'
            ];
            return redirect()->route('admin.user-management')->with('status', $status);
        } catch (\Exception $e) {
            DB::rollBack();
            $status = [
                'type' => 'fail',
                'message' => 'Error' . $e->getMessage()
            ];
            return redirect()->back()->with(['status' => $status]);
        }
    }

    public function updateUserAction(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'username' => [
                'required',
                'string',
                'max:255',
                Rule::unique('users')->ignore($id),
            ],
            'nip' => 'required|string|size:18',
            'role' => 'required|in:ADMIN,USER',
            'timKerjaId' => 'required|array',
            'password' => 'nullable|string|min:8',
            'timKerjaId.*' => 'exists:siperang_tim_kerja,id',
        ]);
        DB::beginTransaction();

        try {
            $user = User::findOrFail($id);
            $user->nama = $validatedData['nama'];
            $user->username = $validatedData['username'];
            $user->nip = $validatedData['nip'];
            $user->role = $validatedData['role'];
            if (!empty($validatedData['password'])) {
                $user->password = Hash::make($validatedData['password']);
            }
            $user->save();
            $user->timKerjas()->sync($validatedData['timKerjaId']);
            DB::commit();
            $status = [
                'type' => 'success',
                'message' => 'User ' . $user->nama . ' berhasil diperbarui!'
            ];
            return redirect()->route('admin.user-management')->with('status', $status);
        } catch (\Exception $e) {
            DB::rollBack();
            $status = [
                'type' => 'fail',
                'message' => 'Error' . $e->getMessage()
            ];
            return redirect()->back()->with(['status' => $status]);
        }
    }

    public function changeUserStatusAction($id, Request $request)
    {
        try {
            $user = User::findOrFail($id);
            $user->status = $request->get('status');
            $user->save();

            return redirect()->route('admin.user-management')->with('status', [
                'type' => 'success',
                'message' => 'Status user ' . $user->nama . ' berhasil diubah menjadi ' . $user->status . '.'
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'status' => [
                    'type' => 'fail',
                    'message' => 'Terjadi kesalahan: ' . $e->getMessage()
                ]
            ]);
        }
    }

    public function createTimKerjaAction(Request $request)
    {
        $validatedData = $request->validate([
            'nama' => 'required|string|max:256|unique:tim_kerja',
            'namaKetua' => 'required|string|max:256',
            'nipKetua' => 'required|string|max:256',
        ]);

        try {
            $timKerja = TimKerja::create([
                'nama' => $validatedData['nama'],
                'nama_ketua' => $validatedData['namaKetua'],
                'nip_ketua' => $validatedData['nipKetua'],
            ]);

            $status = [
                'type' => 'success',
                'message' => 'Tim Kerja ' . $timKerja->nama . ' berhasil ditambahkan!'
            ];
            return redirect()->route('admin.user-management.tim-kerja')->with('status', $status);
        } catch (\Exception $e) {
            $status = [
                'type' => 'fail',
                'message' => 'Error' . $e->getMessage()
            ];
            return redirect()->back()->with(['status' => $status]);
        }
    }

    public function updateTimKerjaAction(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nama' => 'required|string|max:256',
            'namaKetua' => 'required|string|max:256',
            'nipKetua' => 'required|string|max:256',
        ]);

        try {
            $timKerja = TimKerja::findOrFail($id);
            $timKerja->update([
                'nama' => $validatedData['nama'],
                'nama_ketua' => $validatedData['namaKetua'],
                'nip_ketua' => $validatedData['nipKetua'],
            ]);
            $status = [
                'type' => 'success',
                'message' => 'Tim Kerja ' . $timKerja->nama . ' berhasil diupdate!'
            ];
            return redirect()->route('admin.user-management.tim-kerja')->with('status', $status);
        } catch (\Exception $e) {
            $status = [
                'type' => 'fail',
                'message' => 'Error' . $e->getMessage()
            ];
            return redirect()->back()->with(['status' => $status]);
        }
    }


    public function deleteTimKerja($id)
    {
        $timKerja = TimKerja::findOrFail($id);
        $isUsed = $timKerja->users()->exists();

        if ($isUsed) {
            $status = [
                'type' => 'fail',
                'message' => 'Tim kerja"' . $timKerja->nama . '" tidak dapat dihapus karena sedang digunakan!'
            ];

            return redirect()->back()->with('status', $status);
        }

        $timKerja->delete();
        $status = [
            'type' => 'success',
            'message' => 'Tim kerja "' . $timKerja->nama . '" berhasil dihapus!'
        ];

        return redirect()->back()->with('status', $status);
    }
}
